const nodemailer = require("nodemailer");

let transporter = null;

async function initializeTransporter(smtpConfig) {
  try {
    transporter = nodemailer.createTransport({
      host: smtpConfig.smtpHost,
      port: parseInt(smtpConfig.smtpPort),
      secure: smtpConfig.smtpPort === 465,
      auth: {
        user: smtpConfig.smtpUser,
        pass: smtpConfig.smtpPassword,
      },
    });

    // Verify connection
    await transporter.verify();
    console.log("✓ Email service initialized successfully");
    return true;
  } catch (error) {
    console.error("✗ Email service initialization failed:", error.message);
    transporter = null;
    return false;
  }
}

async function sendEmail(to, subject, htmlContent) {
  if (!transporter) {
    console.error("Email service not initialized");
    return false;
  }

  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM_EMAIL || "noreply@samsongroup.com.ph",
      to,
      subject,
      html: htmlContent,
    });
    console.log(`✓ Email sent to ${to}`);
    return true;
  } catch (error) {
    console.error(`✗ Failed to send email to ${to}:`, error.message);
    return false;
  }
}

async function sendContactFormEmail(contactData, inboxEmail) {
  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #3f2b17;">New Contact Form Submission</h2>
      <p>You have received a new message from your website contact form.</p>
      
      <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
        <p><strong>Name:</strong> ${contactData.name}</p>
        <p><strong>Email:</strong> ${contactData.email}</p>
        <p><strong>Phone:</strong> ${contactData.phone || "Not provided"}</p>
        <p><strong>Subject:</strong> ${contactData.subject}</p>
        <p><strong>Message:</strong></p>
        <p>${contactData.message.replace(/\n/g, "<br>")}</p>
      </div>
      
      <p style="color: #666; font-size: 12px;">
        Sent from Samson Group Website Contact Form<br>
        Date: ${new Date().toLocaleString()}
      </p>
    </div>
  `;

  return sendEmail(
    inboxEmail,
    `New Contact Form Message from ${contactData.name}`,
    htmlContent
  );
}

async function sendChatInitialEmail(visitorData, inboxEmail) {
  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #3f2b17;">New Chat Initiated</h2>
      <p>A visitor has initiated a chat conversation on your website.</p>
      
      <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
        <p><strong>Visitor Name:</strong> ${visitorData.visitorName}</p>
        <p><strong>Visitor Email:</strong> ${visitorData.visitorEmail}</p>
        <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
        <p><strong>Message:</strong> "${visitorData.initialMessage || "Chat started"}"</p>
      </div>
      
      <p style="margin-top: 20px;">
        <a href="http://localhost:3000/admin/dashboard" style="background-color: #b8892e; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">
          View Chat in Dashboard
        </a>
      </p>
      
      <p style="color: #666; font-size: 12px;">
        This is an automated notification from Samson Group Website Chat System
      </p>
    </div>
  `;

  return sendEmail(
    inboxEmail,
    `New Chat from ${visitorData.visitorName}`,
    htmlContent
  );
}

module.exports = {
  initializeTransporter,
  sendEmail,
  sendContactFormEmail,
  sendChatInitialEmail,
};
