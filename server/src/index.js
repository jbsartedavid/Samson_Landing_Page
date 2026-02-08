const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { PrismaClient } = require("@prisma/client");
const {
  initializeTransporter,
  sendEmail,
  sendContactFormEmail,
  sendChatInitialEmail,
} = require("./emailService");

dotenv.config();

const prisma = new PrismaClient();
const app = express();

app.use(cors());
app.use(express.json({ limit: "2mb" }));

const port = process.env.PORT || 3001;

// Initialize email service on startup
async function initializeEmailService() {
  try {
    const smtpConfig = await prisma.content.findMany({
      where: {
        key: {
          in: ["smtpHost", "smtpPort", "smtpUser", "smtpPassword", "smtpFromEmail"],
        },
      },
    });

    if (smtpConfig.length === 5) {
      const config = {};
      smtpConfig.forEach((item) => {
        config[item.key] = item.value;
      });

      if (config.smtpUser && config.smtpPassword) {
        await initializeTransporter(config);
      }
    }
  } catch (error) {
    console.error("Error initializing email service:", error);
  }
}

function normalizeValue(value) {
  if (typeof value === "string") {
    return value;
  }
  return JSON.stringify(value);
}

function buildAssistantReply(message) {
  const lower = message.toLowerCase();
  if (lower.includes("price") || lower.includes("cost")) {
    return "We can share pricing options after a short consultation. May we get your preferred branch and contact details?";
  }
  if (lower.includes("branch") || lower.includes("location")) {
    return "We have branches across Cavite, including Imus, Bacoor, Kawit, and General Trias. Which location is most convenient for you?";
  }
  if (lower.includes("memorial") || lower.includes("garden")) {
    return "Our memorial gardens offer premium lots, columbarium units, and serene spaces for remembrance. Would you like a guided visit?";
  }
  return "Thank you for reaching out. Our care team is here to help. Please share the details of what you need, and we will respond promptly.";
}

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.get("/api/content", async (_req, res) => {
  const content = await prisma.content.findMany({ orderBy: { id: "asc" } });
  res.json(content);
});

app.get("/api/content/:key", async (req, res) => {
  const item = await prisma.content.findUnique({ where: { key: req.params.key } });
  if (!item) {
    return res.status(404).json({ error: "Content not found" });
  }
  return res.json(item);
});

app.put("/api/content/:key", async (req, res) => {
  const { value } = req.body;
  if (value === undefined || value === null) {
    return res.status(400).json({ error: "Value is required" });
  }

  const item = await prisma.content.upsert({
    where: { key: req.params.key },
    update: { value: normalizeValue(value) },
    create: { key: req.params.key, value: normalizeValue(value) },
  });

  return res.json(item);
});

app.post("/api/lead", async (req, res) => {
  const { name, email, phone, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: "Name, email, and message are required" });
  }

  const lead = await prisma.lead.create({
    data: {
      name,
      email,
      phone: phone || null,
      message,
    },
  });

  return res.status(201).json(lead);
});

app.post("/api/contact", async (req, res) => {
  const { name, email, phone, message, subject } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Name, email, and message are required" });
  }

  try {
    const lead = await prisma.lead.create({
      data: {
        name,
        email,
        phone: phone || null,
        message: subject ? `[${subject}] ${message}` : message,
      },
    });

    const toAddress = process.env.CONTACT_TO || process.env.SMTP_USER;
    if (!toAddress) {
      return res.status(500).json({ error: "Email destination not configured" });
    }

    await mailTransport.sendMail({
      from: process.env.CONTACT_FROM || process.env.SMTP_USER,
      to: toAddress,
      replyTo: email,
      subject: subject || "New Contact Form Submission",
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone || "N/A"}\n\n${message}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || "N/A"}</p>
        <p><strong>Subject:</strong> ${subject || "N/A"}</p>
        <p><strong>Message:</strong><br/>${message.replace(/\n/g, "<br/>")}</p>
      `,
    });

    return res.status(201).json({ message: "Contact message sent", leadId: lead.id });
  } catch (error) {
    console.error("Contact form error:", error);
    return res.status(500).json({ error: "Failed to send message" });
  }
});

app.post("/api/chat", async (req, res) => {
  const { sessionId, message, visitorName, visitorEmail } = req.body;
  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  let session = null;
  if (sessionId) {
    session = await prisma.chatSession.findUnique({ where: { id: sessionId } });
  }

  if (!session) {
    session = await prisma.chatSession.create({ 
      data: { 
        visitorName: visitorName || null, 
        visitorEmail: visitorEmail || null,
        hasUnreadAdmin: true,
        lastMessageAt: new Date()
      } 
    });
  } else {
    // Update session with new message timestamp and mark as unread for admin
    await prisma.chatSession.update({
      where: { id: session.id },
      data: { 
        hasUnreadAdmin: true,
        lastMessageAt: new Date()
      }
    });
  }

  await prisma.chatMessage.create({
    data: { sessionId: session.id, role: "user", content: message },
  });

  const reply = buildAssistantReply(message);
  await prisma.chatMessage.create({
    data: { sessionId: session.id, role: "assistant", content: reply },
  });

  const messages = await prisma.chatMessage.findMany({
    where: { sessionId: session.id },
    orderBy: { createdAt: "asc" },
  });

  return res.json({ sessionId: session.id, reply, messages });
});

// ===== ADMIN CHAT ENDPOINTS =====
app.get("/api/admin/chats", async (_req, res) => {
  try {
    const sessions = await prisma.chatSession.findMany({
      include: {
        messages: {
          orderBy: { createdAt: "desc" },
          take: 1
        },
        _count: {
          select: { messages: true }
        }
      },
      orderBy: { lastMessageAt: "desc" }
    });
    res.json(sessions);
  } catch (error) {
    console.error("Get chat sessions error:", error);
    res.status(500).json({ error: "Failed to fetch chat sessions" });
  }
});

app.get("/api/admin/chats/:id", async (req, res) => {
  try {
    const sessionId = parseInt(req.params.id);
    const session = await prisma.chatSession.findUnique({
      where: { id: sessionId },
      include: {
        messages: {
          orderBy: { createdAt: "asc" }
        }
      }
    });

    if (!session) {
      return res.status(404).json({ error: "Chat session not found" });
    }

    // Mark messages as read for admin
    await prisma.chatSession.update({
      where: { id: sessionId },
      data: { hasUnreadAdmin: false }
    });

    res.json(session);
  } catch (error) {
    console.error("Get chat session error:", error);
    res.status(500).json({ error: "Failed to fetch chat session" });
  }
});

app.post("/api/admin/chats/:id/reply", async (req, res) => {
  try {
    const sessionId = parseInt(req.params.id);
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const session = await prisma.chatSession.findUnique({
      where: { id: sessionId }
    });

    if (!session) {
      return res.status(404).json({ error: "Chat session not found" });
    }

    const newMessage = await prisma.chatMessage.create({
      data: { 
        sessionId: sessionId, 
        role: "admin", 
        content: message,
        isRead: false
      }
    });

    // Update session last message time
    await prisma.chatSession.update({
      where: { id: sessionId },
      data: { lastMessageAt: new Date() }
    });

    res.json({ message: "Reply sent", data: newMessage });
  } catch (error) {
    console.error("Send chat reply error:", error);
    res.status(500).json({ error: "Failed to send reply" });
  }
});

app.patch("/api/admin/chats/:id/status", async (req, res) => {
  try {
    const sessionId = parseInt(req.params.id);
    const { status } = req.body;

    if (!["active", "closed"].includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }

    const updated = await prisma.chatSession.update({
      where: { id: sessionId },
      data: { status }
    });

    res.json(updated);
  } catch (error) {
    console.error("Update chat status error:", error);
    res.status(500).json({ error: "Failed to update chat status" });
  }
});

app.delete("/api/admin/chats/:id", async (req, res) => {
  try {
    const sessionId = parseInt(req.params.id);
    await prisma.chatSession.delete({
      where: { id: sessionId }
    });
    res.json({ message: "Chat session deleted" });
  } catch (error) {
    console.error("Delete chat session error:", error);
    res.status(500).json({ error: "Failed to delete chat session" });
  }
});

// Admin login endpoint
app.post("/api/admin/login", async (req, res) => {
  const { email, password } = req.body;

  // Simple demo authentication
  // In production, use proper authentication with database
  if (email === "admin@samson.com" && password === "Admin123!") {
    return res.json({
      token: "demo-token-" + Date.now(),
      message: "Login successful",
    });
  }

  return res.status(401).json({ error: "Invalid credentials" });
});

// ===== ANNOUNCEMENTS ENDPOINTS =====
app.get("/api/announcements", async (_req, res) => {
  try {
    const announcements = await prisma.announcement.findMany({
      orderBy: [{ priority: "desc" }, { createdAt: "desc" }],
    });
    res.json(announcements);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch announcements" });
  }
});

app.post("/api/announcements", async (req, res) => {
  try {
    const { title, content, image, priority } = req.body;

    if (!title || !content) {
      return res.status(400).json({ error: "Title and content are required" });
    }

    const announcement = await prisma.announcement.create({
      data: {
        title,
        content,
        image: image || null,
        priority: priority || 0,
      },
    });

    res.status(201).json(announcement);
  } catch (error) {
    console.error("Announcement creation error:", error);
    res.status(500).json({ error: "Failed to create announcement" });
  }
});

app.put("/api/announcements/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, image, priority } = req.body;

    const announcement = await prisma.announcement.update({
      where: { id: parseInt(id) },
      data: {
        title: title || undefined,
        content: content || undefined,
        image: image || undefined,
        priority: priority !== undefined ? priority : undefined,
      },
    });

    res.json(announcement);
  } catch (error) {
    console.error("Announcement update error:", error);
    res.status(500).json({ error: "Failed to update announcement" });
  }
});

app.delete("/api/announcements/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.announcement.delete({ where: { id: parseInt(id) } });
    res.json({ message: "Announcement deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete announcement" });
  }
});

// ===== DIRECTORY ENDPOINTS =====
app.get("/api/directory", async (_req, res) => {
  try {
    const entries = await prisma.directoryEntry.findMany({
      orderBy: { type: "asc" },
    });
    res.json(entries);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch directory" });
  }
});

app.post("/api/directory", async (req, res) => {
  try {
    const { name, type, address, phone, email, hours, image, latitude, longitude } = req.body;

    if (!name || !type || !address) {
      return res.status(400).json({ error: "Name, type, and address are required" });
    }

    const entry = await prisma.directoryEntry.create({
      data: {
        name,
        type,
        address,
        phone: phone || null,
        email: email || null,
        hours: hours || null,
        image: image || null,
        latitude: latitude || null,
        longitude: longitude || null,
      },
    });

    res.status(201).json(entry);
  } catch (error) {
    console.error("Directory entry creation error:", error);
    res.status(500).json({ error: "Failed to create directory entry" });
  }
});

app.put("/api/directory/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, type, address, phone, email, hours, image, latitude, longitude } = req.body;

    const entry = await prisma.directoryEntry.update({
      where: { id: parseInt(id) },
      data: {
        name: name || undefined,
        type: type || undefined,
        address: address || undefined,
        phone: phone || undefined,
        email: email || undefined,
        hours: hours || undefined,
        image: image || undefined,
        latitude: latitude || undefined,
        longitude: longitude || undefined,
      },
    });

    res.json(entry);
  } catch (error) {
    console.error("Directory entry update error:", error);
    res.status(500).json({ error: "Failed to update directory entry" });
  }
});

app.delete("/api/directory/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.directoryEntry.delete({ where: { id: parseInt(id) } });
    res.json({ message: "Directory entry deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete directory entry" });
  }
});

// Officers/Employees API
app.get("/api/officers", async (_req, res) => {
  try {
    const officers = await prisma.officer.findMany({
      orderBy: { order: "asc" },
    });
    res.json(officers);
  } catch (error) {
    console.error("Officers fetch error:", error);
    res.status(500).json({ error: "Failed to fetch officers" });
  }
});

app.post("/api/officers", async (req, res) => {
  try {
    const { name, position, department, email, phone, bio, image, order } = req.body;

    if (!name || !position) {
      return res.status(400).json({ error: "Name and position are required" });
    }

    const officer = await prisma.officer.create({
      data: {
        name,
        position,
        department: department || null,
        email: email || null,
        phone: phone || null,
        bio: bio || null,
        image: image || null,
        order: order || 0,
      },
    });

    res.status(201).json(officer);
  } catch (error) {
    console.error("Officer creation error:", error);
    res.status(500).json({ error: "Failed to create officer" });
  }
});

app.put("/api/officers/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, position, department, email, phone, bio, image, order } = req.body;

    const officer = await prisma.officer.update({
      where: { id: parseInt(id) },
      data: {
        name: name || undefined,
        position: position || undefined,
        department: department || undefined,
        email: email || undefined,
        phone: phone || undefined,
        bio: bio || undefined,
        image: image || undefined,
        order: order !== undefined ? order : undefined,
      },
    });

    res.json(officer);
  } catch (error) {
    console.error("Officer update error:", error);
    res.status(500).json({ error: "Failed to update officer" });
  }
});

app.delete("/api/officers/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.officer.delete({ where: { id: parseInt(id) } });
    res.json({ message: "Officer deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete officer" });
  }
});

// Services/Carousel API
app.get("/api/services", async (_req, res) => {
  try {
    const services = await prisma.service.findMany({
      orderBy: { order: "asc" },
    });
    res.json(services);
  } catch (error) {
    console.error("Services fetch error:", error);
    res.status(500).json({ error: "Failed to fetch services" });
  }
});

app.post("/api/services", async (req, res) => {
  try {
    const { name, heading, caption, content, image, order } = req.body;

    if (!heading) {
      return res.status(400).json({ error: "Heading is required" });
    }

    const service = await prisma.service.create({
      data: {
        name: name || heading,
        heading,
        caption: caption || null,
        content: content || null,
        image: image || null,
        order: order || 0,
      },
    });

    res.status(201).json(service);
  } catch (error) {
    console.error("Service creation error:", error);
    res.status(500).json({ error: "Failed to create service" });
  }
});

app.put("/api/services/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, heading, caption, content, image, order } = req.body;

    const service = await prisma.service.update({
      where: { id: parseInt(id) },
      data: {
        name: name || undefined,
        heading: heading || undefined,
        caption: caption || undefined,
        content: content || undefined,
        image: image || undefined,
        order: order !== undefined ? order : undefined,
      },
    });

    res.json(service);
  } catch (error) {
    console.error("Service update error:", error);
    res.status(500).json({ error: "Failed to update service" });
  }
});

app.delete("/api/services/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.service.delete({ where: { id: parseInt(id) } });
    res.json({ message: "Service deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete service" });
  }
});

// Affiliations API
app.get("/api/affiliations", async (_req, res) => {
  try {
    const affiliations = await prisma.affiliation.findMany({
      orderBy: { order: "asc" },
    });
    res.json(affiliations);
  } catch (error) {
    console.error("Affiliations fetch error:", error);
    res.status(500).json({ error: "Failed to fetch affiliations" });
  }
});

app.post("/api/affiliations", async (req, res) => {
  try {
    const { name, description, logo, order } = req.body;

    if (!name) {
      return res.status(400).json({ error: "Name is required" });
    }

    const affiliation = await prisma.affiliation.create({
      data: {
        name,
        description: description || null,
        logo: logo || null,
        order: order || 0,
      },
    });

    res.status(201).json(affiliation);
  } catch (error) {
    console.error("Affiliation creation error:", error);
    res.status(500).json({ error: "Failed to create affiliation" });
  }
});

app.put("/api/affiliations/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, logo, order } = req.body;

    const affiliation = await prisma.affiliation.update({
      where: { id: parseInt(id) },
      data: {
        name: name || undefined,
        description: description || undefined,
        logo: logo || undefined,
        order: order !== undefined ? order : undefined,
      },
    });

    res.json(affiliation);
  } catch (error) {
    console.error("Affiliation update error:", error);
    res.status(500).json({ error: "Failed to update affiliation" });
  }
});

app.delete("/api/affiliations/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.affiliation.delete({ where: { id: parseInt(id) } });
    res.json({ message: "Affiliation deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete affiliation" });
  }
});

// ===== CONTACT FORM =====
app.post("/api/contact-form", async (req, res) => {
  try {
    const { name, email, phone, subject, message, captchaToken } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const captchaEnabledConfig = await prisma.content.findUnique({
      where: { key: "captchaEnabled" },
    });

    const captchaEnabled = captchaEnabledConfig?.value === "true";

    if (captchaEnabled) {
      const captchaSecret = process.env.HCAPTCHA_SECRET;
      if (!captchaSecret) {
        return res.status(500).json({ error: "Captcha not configured" });
      }

      if (!captchaToken) {
        return res.status(400).json({ error: "Captcha verification required" });
      }

      const captchaResponse = await fetch("https://hcaptcha.com/siteverify", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          secret: captchaSecret,
          response: captchaToken,
          remoteip: req.ip,
        }).toString(),
      });

      const captchaResult = await captchaResponse.json();
      if (!captchaResult.success) {
        return res.status(400).json({ error: "Captcha verification failed" });
      }
    }

    // Get inbox email from config
    const inboxEmailConfig = await prisma.content.findUnique({
      where: { key: "contactFormEmail" },
    });

    const inboxEmail = inboxEmailConfig?.value || "info@samsongroup.com.ph";

    // Send email
    const emailSent = await sendContactFormEmail(
      { name, email, phone, subject, message },
      inboxEmail
    );

    if (!emailSent) {
      return res.status(500).json({ error: "Failed to send email" });
    }

    // Save contact inquiry to database
    const inquiry = await prisma.lead.create({
      data: {
        name,
        email,
        phone: phone || "",
        message,
        source: "contact-form",
      },
    });

    res.json({
      success: true,
      message: "Your message has been sent successfully",
      inquiryId: inquiry.id,
    });
  } catch (error) {
    console.error("Contact form error:", error);
    res.status(500).json({ error: "Failed to process contact form" });
  }
});

// ===== SMTP CONFIGURATION =====
app.get("/api/admin/smtp-config", async (req, res) => {
  try {
    const smtpConfig = await prisma.content.findMany({
      where: {
        key: {
          in: [
            "smtpHost",
            "smtpPort",
            "smtpUser",
            "smtpPassword",
            "smtpFromEmail",
            "contactFormEmail",
          ],
        },
      },
    });

    const config = {};
    smtpConfig.forEach((item) => {
      config[item.key] = item.value;
    });

    res.json(config);
  } catch (error) {
    console.error("SMTP config error:", error);
    res.status(500).json({ error: "Failed to retrieve SMTP config" });
  }
});

app.put("/api/admin/smtp-config", async (req, res) => {
  try {
    const {
      smtpHost,
      smtpPort,
      smtpUser,
      smtpPassword,
      smtpFromEmail,
      contactFormEmail,
    } = req.body;

    const updates = [
      { key: "smtpHost", value: smtpHost },
      { key: "smtpPort", value: smtpPort },
      { key: "smtpUser", value: smtpUser },
      { key: "smtpPassword", value: smtpPassword },
      { key: "smtpFromEmail", value: smtpFromEmail },
      { key: "contactFormEmail", value: contactFormEmail },
    ];

    for (const update of updates) {
      await prisma.content.upsert({
        where: { key: update.key },
        update: { value: update.value },
        create: { key: update.key, value: update.value },
      });
    }

    // Re-initialize email service with new config
    const config = {
      smtpHost,
      smtpPort,
      smtpUser,
      smtpPassword,
      smtpFromEmail,
    };

    if (smtpUser && smtpPassword) {
      await initializeTransporter(config);
    }

    res.json({ success: true, message: "SMTP configuration updated" });
  } catch (error) {
    console.error("SMTP config update error:", error);
    res.status(500).json({ error: "Failed to update SMTP configuration" });
  }
});

// ===== ENHANCED CHAT INITIALIZATION =====
app.post("/api/chat/init", async (req, res) => {
  try {
    const { visitorName, visitorEmail, initialMessage } = req.body;

    if (!visitorName || !visitorEmail) {
      return res.status(400).json({ error: "Name and email are required" });
    }

    // Create a new chat session
    const session = await prisma.chatSession.create({
      data: {
        visitorName,
        visitorEmail,
        status: "active",
        hasUnreadAdmin: true,
        lastMessageAt: new Date(),
      },
    });

    // If there's an initial message, save it
    if (initialMessage) {
      await prisma.chatMessage.create({
        data: {
          sessionId: session.id,
          role: "user",
          content: initialMessage,
          isRead: false,
        },
      });
    }

    // Send initial email notification to admin
    const inboxEmailConfig = await prisma.content.findUnique({
      where: { key: "contactFormEmail" },
    });

    const inboxEmail = inboxEmailConfig?.value || "info@samsongroup.com.ph";

    await sendChatInitialEmail(
      {
        visitorName,
        visitorEmail,
        initialMessage: initialMessage || "Chat session started",
      },
      inboxEmail
    );

    res.json({
      success: true,
      sessionId: session.id,
      message: "Chat session created",
    });
  } catch (error) {
    console.error("Chat init error:", error);
    res.status(500).json({ error: "Failed to initialize chat" });
  }
});

app.listen(port, async () => {
  console.log(`Samson API running on port ${port}`);
  await initializeEmailService();
});
