"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const router = useRouter();
  const [authError, setAuthError] = useState("");
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("general");

  // General content state
  const [heroTitle, setHeroTitle] = useState("");
  const [heroSubtitle, setHeroSubtitle] = useState("");
  const [heroImage, setHeroImage] = useState("");
  const [heroVideo, setHeroVideo] = useState("");
  const [aboutText, setAboutText] = useState("");
  const [aboutFeature1, setAboutFeature1] = useState("");
  const [aboutFeature2, setAboutFeature2] = useState("");
  const [aboutFeature3, setAboutFeature3] = useState("");
  const [aboutFeature4, setAboutFeature4] = useState("");
  const [legacyTitle, setLegacyTitle] = useState("");
  const [legacyDescription, setLegacyDescription] = useState("");
  const [missionTitle, setMissionTitle] = useState("");
  const [missionText, setMissionText] = useState("");
  const [visionTitle, setVisionTitle] = useState("");
  const [visionText, setVisionText] = useState("");
  const [valuesTitle, setValuesTitle] = useState("");
  const [valuesItems, setValuesItems] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactLocations, setContactLocations] = useState("");
  const [facebookMessengerUrl, setFacebookMessengerUrl] = useState("");
  const [facebookMessengerText, setFacebookMessengerText] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [captchaEnabled, setCaptchaEnabled] = useState(false);
  const [hcaptchaSiteKey, setHcaptchaSiteKey] = useState("");
  const [footerTitle, setFooterTitle] = useState("");
  const [footerTagline, setFooterTagline] = useState("");
  const [footerCopyright, setFooterCopyright] = useState("");
  const [footerQuickLinks, setFooterQuickLinks] = useState([]);
  const [footerOtherLinks, setFooterOtherLinks] = useState([]);
  const [footerAddresses, setFooterAddresses] = useState([]);

  // SMTP Configuration state
  const [smtpHost, setSmtpHost] = useState("");
  const [smtpPort, setSmtpPort] = useState("587");
  const [smtpUser, setSmtpUser] = useState("");
  const [smtpPassword, setSmtpPassword] = useState("");
  const [smtpFromEmail, setSmtpFromEmail] = useState("");
  const [contactFormEmail, setContactFormEmail] = useState("");

  // Announcements state
  const [announcements, setAnnouncements] = useState([]);
  const [newAnnouncement, setNewAnnouncement] = useState({
    title: "",
    content: "",
    image: "",
    priority: 0,
  });
  const [editingAnnouncement, setEditingAnnouncement] = useState(null);

  // Directory state
  const [directoryEntries, setDirectoryEntries] = useState([]);
  const [newDirectory, setNewDirectory] = useState({
    name: "",
    type: "Funeral Parlor",
    address: "",
    phone: "",
    email: "",
    hours: "",
    image: "",
    latitude: "",
    longitude: "",
  });
  const [editingDirectory, setEditingDirectory] = useState(null);

  // Officers state
  const [officers, setOfficers] = useState([]);
  const [newOfficer, setNewOfficer] = useState({
    name: "",
    position: "",
    department: "",
    email: "",
    phone: "",
    bio: "",
    image: "",
  });
  const [editingOfficer, setEditingOfficer] = useState(null);

  // Services state
  const [services, setServices] = useState([]);
  const [newService, setNewService] = useState({
    heading: "",
    caption: "",
    image: "",
    order: 0,
  });
  const [editingService, setEditingService] = useState(null);

  // Affiliations state
  const [affiliations, setAffiliations] = useState([]);
  const [newAffiliation, setNewAffiliation] = useState({
    name: "",
    description: "",
    logo: "",
    order: 0,
  });
  const [editingAffiliation, setEditingAffiliation] = useState(null);

  // Chats state
  const [chatSessions, setChatSessions] = useState([]);
  const [selectedSession, setSelectedSession] = useState(null);
  const [replyMessage, setReplyMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [chatFilter, setChatFilter] = useState("all");

  // Save status
  const [saveStatus, setSaveStatus] = useState("");

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("adminToken");
      if (!token) {
        setAuthError("No authentication token found. Redirecting to login...");
        setTimeout(() => router.push("/admin/login"), 2000);
        return;
      }
      loadAllContent();
    };
    checkAuth();
  }, [router]);

  const loadAllContent = async () => {
    try {
      const [contentRes, announcementsRes, directoryRes, officersRes, servicesRes, affiliationsRes, chatsRes] =
        await Promise.all([
          fetch("/api/content"),
          fetch("/api/announcements"),
          fetch("/api/directory"),
          fetch("/api/officers"),
          fetch("/api/services"),
          fetch("/api/affiliations"),
          fetch("/api/admin/chats"),
        ]);

      if (contentRes.ok) {
        const data = await contentRes.json();
        const contentMap = {};
        data.forEach((item) => {
          contentMap[item.key] = item.value;
        });
        setHeroTitle(contentMap.heroTitle || "");
        setHeroSubtitle(contentMap.heroSubtitle || "");
        setHeroImage(contentMap.heroImage || "");
        setHeroVideo(contentMap.heroVideo || "");
        setAboutText(contentMap.aboutText || "");
        setAboutFeature1(contentMap.aboutFeature1 || "");
        setAboutFeature2(contentMap.aboutFeature2 || "");
        setAboutFeature3(contentMap.aboutFeature3 || "");
        setAboutFeature4(contentMap.aboutFeature4 || "");
        setLegacyTitle(contentMap.legacyTitle || "");
        setLegacyDescription(contentMap.legacyDescription || "");
        setMissionTitle(contentMap.missionTitle || "");
        setMissionText(contentMap.missionText || "");
        setVisionTitle(contentMap.visionTitle || "");
        setVisionText(contentMap.visionText || "");
        setValuesTitle(contentMap.valuesTitle || "");
        setValuesItems(contentMap.valuesItems || "");
        setContactPhone(contentMap.contactPhone || "");
        setContactEmail(contentMap.contactEmail || "");
        setContactLocations(contentMap.contactLocations || "");
        setFacebookMessengerUrl(contentMap.facebookMessengerUrl || "");
        setFacebookMessengerText(contentMap.facebookMessengerText || "");
        setWhatsappNumber(contentMap.whatsappNumber || "");
        setCaptchaEnabled(contentMap.captchaEnabled === "true");
        setHcaptchaSiteKey(contentMap.hcaptchaSiteKey || "");
        setFooterTitle(contentMap.footerTitle || "");
        setFooterTagline(contentMap.footerTagline || "");
        setFooterCopyright(contentMap.footerCopyright || "");
        setFooterQuickLinks(contentMap.footerQuickLinks ? JSON.parse(contentMap.footerQuickLinks) : []);
        setFooterOtherLinks(contentMap.footerOtherLinks ? JSON.parse(contentMap.footerOtherLinks) : []);
        setFooterAddresses(contentMap.footerAddresses ? JSON.parse(contentMap.footerAddresses) : []);
      }

      if (announcementsRes.ok) {
        const data = await announcementsRes.json();
        setAnnouncements(data);
      }

      if (directoryRes.ok) {
        const data = await directoryRes.json();
        setDirectoryEntries(data);
      }

      if (officersRes.ok) {
        const data = await officersRes.json();
        setOfficers(data);
      }

      if (servicesRes.ok) {
        const data = await servicesRes.json();
        setServices(data);
      }

      if (affiliationsRes.ok) {
        const data = await affiliationsRes.json();
        setAffiliations(data);
      }

      if (chatsRes.ok) {
        const data = await chatsRes.json();
        setChatSessions(data);
      }

      // Load SMTP configuration
      await loadSmtpConfig();

      setLoading(false);
    } catch (error) {
      console.error("Error loading content:", error);
      setSaveStatus("Error loading content");
      setLoading(false);
    }
  };

  const handleSaveGeneral = async () => {
    try {
      const results = await Promise.all([
        fetch("/api/content/heroTitle", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ value: heroTitle }),
        }),
        fetch("/api/content/heroSubtitle", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ value: heroSubtitle }),
        }),
        fetch("/api/content/heroImage", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ value: heroImage }),
        }),
        fetch("/api/content/heroVideo", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ value: heroVideo }),
        }),
        fetch("/api/content/aboutText", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ value: aboutText }),
        }),
        fetch("/api/content/aboutFeature1", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ value: aboutFeature1 }),
        }),
        fetch("/api/content/aboutFeature2", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ value: aboutFeature2 }),
        }),
        fetch("/api/content/aboutFeature3", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ value: aboutFeature3 }),
        }),
        fetch("/api/content/aboutFeature4", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ value: aboutFeature4 }),
        }),
        fetch("/api/content/legacyTitle", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ value: legacyTitle }),
        }),
        fetch("/api/content/legacyDescription", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ value: legacyDescription }),
        }),
        fetch("/api/content/missionTitle", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ value: missionTitle }),
        }),
        fetch("/api/content/missionText", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ value: missionText }),
        }),
        fetch("/api/content/visionTitle", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ value: visionTitle }),
        }),
        fetch("/api/content/visionText", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ value: visionText }),
        }),
        fetch("/api/content/valuesTitle", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ value: valuesTitle }),
        }),
        fetch("/api/content/valuesItems", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ value: valuesItems }),
        }),
        fetch("/api/content/contactPhone", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ value: contactPhone }),
        }),
        fetch("/api/content/contactEmail", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ value: contactEmail }),
        }),
        fetch("/api/content/contactLocations", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ value: contactLocations }),
        }),
        fetch("/api/content/facebookMessengerUrl", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ value: facebookMessengerUrl }),
        }),
        fetch("/api/content/facebookMessengerText", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ value: facebookMessengerText }),
        }),
        fetch("/api/content/whatsappNumber", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ value: whatsappNumber }),
        }),
        fetch("/api/content/captchaEnabled", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ value: captchaEnabled ? "true" : "false" }),
        }),
        fetch("/api/content/hcaptchaSiteKey", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ value: hcaptchaSiteKey }),
        }),
        fetch("/api/content/footerTitle", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ value: footerTitle }),
        }),
        fetch("/api/content/footerTagline", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ value: footerTagline }),
        }),
        fetch("/api/content/footerCopyright", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ value: footerCopyright }),
        }),
        fetch("/api/content/footerQuickLinks", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ value: JSON.stringify(footerQuickLinks) }),
        }),
        fetch("/api/content/footerOtherLinks", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ value: JSON.stringify(footerOtherLinks) }),
        }),
        fetch("/api/content/footerAddresses", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ value: JSON.stringify(footerAddresses) }),
        }),
      ]);

      if (results.every((r) => r.ok)) {
        setSaveStatus("General content saved successfully!");
        setTimeout(() => setSaveStatus(""), 3000);
      } else {
        setSaveStatus("Error saving some content");
      }
    } catch (error) {
      console.error("Save error:", error);
      setSaveStatus("Error saving content");
    }
  };

  // ===== ANNOUNCEMENTS =====
  const handleSaveAnnouncement = async () => {
    try {
      if (!newAnnouncement.title || !newAnnouncement.content) {
        setSaveStatus("Title and content are required");
        return;
      }

      const method = editingAnnouncement ? "PUT" : "POST";
      const url = editingAnnouncement ? `/api/announcements/${editingAnnouncement.id}` : "/api/announcements";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newAnnouncement),
      });

      if (response.ok) {
        setSaveStatus(editingAnnouncement ? "Announcement updated successfully!" : "Announcement created successfully!");
        setNewAnnouncement({ title: "", content: "", image: "", priority: 0 });
        setEditingAnnouncement(null);
        setTimeout(() => setSaveStatus(""), 3000);
        loadAllContent();
      } else {
        setSaveStatus("Error saving announcement");
      }
    } catch (error) {
      console.error("Error saving announcement:", error);
      setSaveStatus("Error saving announcement");
    }
  };

  const handleDeleteAnnouncement = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      const response = await fetch(`/api/announcements/${id}`, { method: "DELETE" });
      if (response.ok) {
        setSaveStatus("Announcement deleted successfully!");
        setTimeout(() => setSaveStatus(""), 3000);
        loadAllContent();
      }
    } catch (error) {
      console.error("Error deleting announcement:", error);
      setSaveStatus("Error deleting announcement");
    }
  };

  // ===== DIRECTORY =====
  const handleSaveDirectory = async () => {
    try {
      if (!newDirectory.name || !newDirectory.type || !newDirectory.address) {
        setSaveStatus("Name, type, and address are required");
        return;
      }

      const method = editingDirectory ? "PUT" : "POST";
      const url = editingDirectory ? `/api/directory/${editingDirectory.id}` : "/api/directory";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...newDirectory,
          latitude: newDirectory.latitude ? parseFloat(newDirectory.latitude) : null,
          longitude: newDirectory.longitude ? parseFloat(newDirectory.longitude) : null,
        }),
      });

      if (response.ok) {
        setSaveStatus(editingDirectory ? "Directory entry updated successfully!" : "Directory entry created successfully!");
        setNewDirectory({
          name: "",
          type: "Funerary",
          address: "",
          phone: "",
          email: "",
          hours: "",
          image: "",
          latitude: "",
          longitude: "",
        });
        setEditingDirectory(null);
        setTimeout(() => setSaveStatus(""), 3000);
        loadAllContent();
      } else {
        setSaveStatus("Error saving directory entry");
      }
    } catch (error) {
      console.error("Error saving directory entry:", error);
      setSaveStatus("Error saving directory entry");
    }
  };

  const handleDeleteDirectory = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      const response = await fetch(`/api/directory/${id}`, { method: "DELETE" });
      if (response.ok) {
        setSaveStatus("Directory entry deleted successfully!");
        setTimeout(() => setSaveStatus(""), 3000);
        loadAllContent();
      }
    } catch (error) {
      console.error("Error deleting directory entry:", error);
      setSaveStatus("Error deleting directory entry");
    }
  };

  const handleSaveOfficer = async () => {
    if (!newOfficer.name || !newOfficer.position) {
      setSaveStatus("Name and position are required");
      return;
    }

    try {
      const url = editingOfficer ? `/api/officers/${editingOfficer.id}` : "/api/officers";
      const method = editingOfficer ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newOfficer),
      });

      if (response.ok) {
        setSaveStatus(`Officer ${editingOfficer ? "updated" : "created"} successfully!`);
        setTimeout(() => setSaveStatus(""), 3000);
        setNewOfficer({
          name: "",
          position: "",
          department: "",
          email: "",
          phone: "",
          bio: "",
          image: "",
          order: 0,
        });
        setEditingOfficer(null);
        loadAllContent();
      }
    } catch (error) {
      console.error("Error saving officer:", error);
      setSaveStatus("Error saving officer");
    }
  };

  const handleDeleteOfficer = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      const response = await fetch(`/api/officers/${id}`, { method: "DELETE" });
      if (response.ok) {
        setSaveStatus("Officer deleted successfully!");
        setTimeout(() => setSaveStatus(""), 3000);
        loadAllContent();
      }
    } catch (error) {
      console.error("Error deleting officer:", error);
      setSaveStatus("Error deleting officer");
    }
  };

  const handleSaveService = async () => {
    if (!newService.name || !newService.heading) {
      setSaveStatus("Name and heading are required");
      return;
    }

    try {
      const url = editingService ? `/api/services/${editingService.id}` : "/api/services";
      const method = editingService ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          heading: newService.heading,
          caption: newService.caption,
          content: newService.content,
          image: newService.image,
          order: newService.order,
        }),
      });

      if (response.ok) {
        setSaveStatus(`Service ${editingService ? "updated" : "created"} successfully!`);
        setTimeout(() => setSaveStatus(""), 3000);
        setNewService({
          name: "",
          heading: "",
          caption: "",
          content: "",
          image: "",
          order: 0,
        });
        setEditingService(null);
        loadAllContent();
      }
    } catch (error) {
      console.error("Error saving service:", error);
      setSaveStatus("Error saving service");
    }
  };

  const handleDeleteService = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      const response = await fetch(`/api/services/${id}`, { method: "DELETE" });
      if (response.ok) {
        setSaveStatus("Service deleted successfully!");
        setTimeout(() => setSaveStatus(""), 3000);
        loadAllContent();
      }
    } catch (error) {
      console.error("Error deleting service:", error);
      setSaveStatus("Error deleting service");
    }
  };

  const handleSaveAffiliation = async () => {
    if (!newAffiliation.name) {
      setSaveStatus("Name is required");
      return;
    }

    try {
      const url = editingAffiliation ? `/api/affiliations/${editingAffiliation.id}` : "/api/affiliations";
      const method = editingAffiliation ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newAffiliation.name,
          description: newAffiliation.description,
          logo: newAffiliation.logo,
          order: newAffiliation.order,
        }),
      });

      if (response.ok) {
        setSaveStatus(`Affiliation ${editingAffiliation ? "updated" : "created"} successfully!`);
        setTimeout(() => setSaveStatus(""), 3000);
        setNewAffiliation({
          name: "",
          description: "",
          logo: "",
          order: 0,
        });
        setEditingAffiliation(null);
        loadAllContent();
      }
    } catch (error) {
      console.error("Error saving affiliation:", error);
      setSaveStatus("Error saving affiliation");
    }
  };

  const handleDeleteAffiliation = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      const response = await fetch(`/api/affiliations/${id}`, { method: "DELETE" });
      if (response.ok) {
        setSaveStatus("Affiliation deleted successfully!");
        setTimeout(() => setSaveStatus(""), 3000);
        loadAllContent();
      }
    } catch (error) {
      console.error("Error deleting affiliation:", error);
      setSaveStatus("Error deleting affiliation");
    }
  };

  // Chat handlers
  const loadChatSession = async (sessionId) => {
    try {
      const res = await fetch(`/api/admin/chats/${sessionId}`);
      const data = await res.json();
      setSelectedSession(data);
      setChatMessages(data.messages);
    } catch (error) {
      console.error("Error loading chat session:", error);
    }
  };

  const handleSendReply = async () => {
    if (!replyMessage.trim() || !selectedSession) return;

    try {
      const res = await fetch(`/api/admin/chats/${selectedSession.id}/reply`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: replyMessage }),
      });

      if (res.ok) {
        setReplyMessage("");
        await loadChatSession(selectedSession.id);
        await loadAllContent();
        setSaveStatus("Reply sent successfully!");
        setTimeout(() => setSaveStatus(""), 3000);
      }
    } catch (error) {
      console.error("Error sending reply:", error);
      setSaveStatus("Error sending reply");
    }
  };

  const handleUpdateChatStatus = async (sessionId, status) => {
    try {
      const res = await fetch(`/api/admin/chats/${sessionId}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      if (res.ok) {
        await loadAllContent();
        if (selectedSession?.id === sessionId) {
          await loadChatSession(sessionId);
        }
        setSaveStatus(`Chat marked as ${status}`);
        setTimeout(() => setSaveStatus(""), 3000);
      }
    } catch (error) {
      console.error("Error updating chat status:", error);
    }
  };

  const handleDeleteChatSession = async (sessionId) => {
    if (!confirm("Are you sure you want to delete this chat session?")) return;

    try {
      const res = await fetch(`/api/admin/chats/${sessionId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        await loadAllContent();
        if (selectedSession?.id === sessionId) {
          setSelectedSession(null);
          setChatMessages([]);
        }
        setSaveStatus("Chat session deleted");
        setTimeout(() => setSaveStatus(""), 3000);
      }
    } catch (error) {
      console.error("Error deleting chat session:", error);
    }
  };

  const loadSmtpConfig = async () => {
    try {
      const res = await fetch("/api/admin/smtp-config");
      if (res.ok) {
        const config = await res.json();
        setSmtpHost(config.smtpHost || "");
        setSmtpPort(config.smtpPort || "587");
        setSmtpUser(config.smtpUser || "");
        setSmtpPassword(config.smtpPassword || "");
        setSmtpFromEmail(config.smtpFromEmail || "");
        setContactFormEmail(config.contactFormEmail || "");
      }
    } catch (error) {
      console.error("Error loading SMTP config:", error);
    }
  };

  const handleSaveSmtpConfig = async () => {
    if (!smtpHost || !smtpPort || !smtpUser || !smtpPassword || !smtpFromEmail || !contactFormEmail) {
      setSaveStatus("Error: All SMTP fields are required");
      return;
    }

    try {
      const res = await fetch("/api/admin/smtp-config", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          smtpHost,
          smtpPort,
          smtpUser,
          smtpPassword,
          smtpFromEmail,
          contactFormEmail,
        }),
      });

      if (res.ok) {
        setSaveStatus("SMTP settings saved successfully!");
        setTimeout(() => setSaveStatus(""), 3000);
      } else {
        const error = await res.json();
        setSaveStatus(`Error: ${error.message || "Failed to save settings"}`);
      }
    } catch (error) {
      console.error("Error saving SMTP config:", error);
      setSaveStatus("Error: Failed to save SMTP settings");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    router.push("/admin/login");
  };

  if (authError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-espresso to-deep-gold flex items-center justify-center p-4">
        <div className="bg-white rounded-lg p-8 max-w-md text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
          <p className="text-gray-700 mb-6">{authError}</p>
          <button
            onClick={() => router.push("/admin/login")}
            className="px-6 py-2 bg-gold-600 text-white rounded-lg hover:bg-gold-700 transition"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-espresso to-deep-gold flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-espresso to-deep-gold p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gold-300">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition"
          >
            Logout
          </button>
        </div>

        {/* Status Messages */}
        {saveStatus && (
          <div
            className={`p-4 rounded-lg mb-6 ${
              saveStatus.includes("successfully")
                ? "bg-green-100 text-green-800"
                : saveStatus.includes("Error")
                ? "bg-red-100 text-red-800"
                : "bg-blue-100 text-blue-800"
            }`}
          >
            {saveStatus}
          </div>
        )}

        {/* Floating Status Toast */}
        {saveStatus && (
          <div className="fixed bottom-6 right-6 z-50 max-w-sm">
            <div
              className={`px-5 py-4 rounded-xl shadow-2xl border text-sm font-semibold ${
                saveStatus.includes("successfully")
                  ? "bg-green-600 text-white border-green-500"
                  : saveStatus.includes("Error")
                  ? "bg-red-600 text-white border-red-500"
                  : "bg-blue-600 text-white border-blue-500"
              }`}
            >
              {saveStatus}
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="border-b">
            <div className="flex space-x-0 overflow-x-auto">
              {[
                { id: "general", label: "General Content" },
                { id: "announcements", label: "Announcements" },
                { id: "directory", label: "Directory" },
                { id: "officers", label: "Officers & Employees" },
                { id: "services", label: "Services Carousel" },
                { id: "affiliations", label: "Affiliations & Partnerships" },
                { id: "chats", label: "Visitor Chats" },
                { id: "system-settings", label: "System Settings" },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-4 font-semibold border-b-2 transition whitespace-nowrap ${
                    activeTab === tab.id
                      ? "border-gold-600 text-gold-600 bg-gold-50"
                      : "border-transparent text-gray-600 hover:text-gold-600"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="p-8">
            {/* GENERAL CONTENT TAB */}
            {activeTab === "general" && (
              <div className="space-y-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-8">General Site Content</h2>

                {/* Hero Section Group */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl p-6 shadow-sm">
                  <h3 className="text-xl font-bold text-blue-900 mb-5 flex items-center gap-2">
                    <span className="w-8 h-8 bg-blue-600 text-white rounded-lg flex items-center justify-center text-sm">🏠</span>
                    Hero Section
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Hero Title</label>
                      <input
                        type="text"
                        value={heroTitle}
                        onChange={(e) => setHeroTitle(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gold-600 focus:ring-2 focus:ring-gold-600/20 bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Hero Subtitle</label>
                      <textarea
                        value={heroSubtitle}
                        onChange={(e) => setHeroSubtitle(e.target.value)}
                        rows={3}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gold-600 focus:ring-2 focus:ring-gold-600/20 bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Hero Image URL</label>
                      <input
                        type="text"
                        value={heroImage}
                        onChange={(e) => setHeroImage(e.target.value)}
                        placeholder="https://example.com/image.jpg"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gold-600 focus:ring-2 focus:ring-gold-600/20 bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Hero Video URL</label>
                      <input
                        type="text"
                        value={heroVideo}
                        onChange={(e) => setHeroVideo(e.target.value)}
                        placeholder="https://example.com/hero-video.mp4"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gold-600 focus:ring-2 focus:ring-gold-600/20 bg-white"
                      />
                      <p className="text-xs text-gray-600 mt-2">
                        Use .mp4/.webm/.ogg URL for background video. If set, it overrides the hero image.
                      </p>
                    </div>
                  </div>
                </div>

                {/* About Section Group */}
                <div className="bg-gradient-to-br from-amber-50 to-yellow-50 border-2 border-amber-200 rounded-xl p-6 shadow-sm">
                  <h3 className="text-xl font-bold text-amber-900 mb-5 flex items-center gap-2">
                    <span className="w-8 h-8 bg-amber-600 text-white rounded-lg flex items-center justify-center text-sm">📖</span>
                    About Section
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">About Text</label>
                      <textarea
                        value={aboutText}
                        onChange={(e) => setAboutText(e.target.value)}
                        rows={5}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gold-600 focus:ring-2 focus:ring-gold-600/20 bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">About Features (Bullet Points)</label>
                      <div className="space-y-2">
                        <input
                          type="text"
                          value={aboutFeature1}
                          onChange={(e) => setAboutFeature1(e.target.value)}
                          placeholder="Feature 1"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gold-600 focus:ring-2 focus:ring-gold-600/20 bg-white"
                        />
                        <input
                          type="text"
                          value={aboutFeature2}
                          onChange={(e) => setAboutFeature2(e.target.value)}
                          placeholder="Feature 2"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gold-600 focus:ring-2 focus:ring-gold-600/20 bg-white"
                        />
                        <input
                          type="text"
                          value={aboutFeature3}
                          onChange={(e) => setAboutFeature3(e.target.value)}
                          placeholder="Feature 3"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gold-600 focus:ring-2 focus:ring-gold-600/20 bg-white"
                        />
                        <input
                          type="text"
                          value={aboutFeature4}
                          onChange={(e) => setAboutFeature4(e.target.value)}
                          placeholder="Feature 4"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gold-600 focus:ring-2 focus:ring-gold-600/20 bg-white"
                        />
                      </div>
                    </div>

                    <div className="border-t-2 border-amber-200 pt-4 mt-4">
                      <h4 className="text-md font-semibold text-amber-800 mb-3">Legacy Card</h4>
                      <div className="space-y-3">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">Legacy Title</label>
                          <input
                            type="text"
                            value={legacyTitle}
                            onChange={(e) => setLegacyTitle(e.target.value)}
                            placeholder="Our Legacy"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gold-600 focus:ring-2 focus:ring-gold-600/20 bg-white"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">Legacy Description</label>
                          <textarea
                            value={legacyDescription}
                            onChange={(e) => setLegacyDescription(e.target.value)}
                            rows={3}
                            placeholder="Founded in 1928, we've been trusted by thousands..."
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gold-600 focus:ring-2 focus:ring-gold-600/20 bg-white"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Mission, Vision, Values Group */}
                <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border-2 border-emerald-200 rounded-xl p-6 shadow-sm">
                  <h3 className="text-xl font-bold text-emerald-900 mb-5 flex items-center gap-2">
                    <span className="w-8 h-8 bg-emerald-600 text-white rounded-lg flex items-center justify-center text-sm">🎯</span>
                    Mission, Vision & Values
                  </h3>
                  <div className="space-y-5">
                    {/* Mission Subsection */}
                    <div className="bg-white/60 rounded-lg p-4 border border-emerald-100">
                      <h4 className="text-md font-semibold text-emerald-800 mb-3">Mission</h4>
                      <div className="space-y-3">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">Mission Title</label>
                          <input
                            type="text"
                            value={missionTitle}
                            onChange={(e) => setMissionTitle(e.target.value)}
                            placeholder="Our Mission"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gold-600 focus:ring-2 focus:ring-gold-600/20 bg-white"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">Mission Text</label>
                          <textarea
                            value={missionText}
                            onChange={(e) => setMissionText(e.target.value)}
                            rows={3}
                            placeholder="Describe your mission..."
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gold-600 focus:ring-2 focus:ring-gold-600/20 bg-white"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Vision Subsection */}
                    <div className="bg-white/60 rounded-lg p-4 border border-emerald-100">
                      <h4 className="text-md font-semibold text-emerald-800 mb-3">Vision</h4>
                      <div className="space-y-3">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">Vision Title</label>
                          <input
                            type="text"
                            value={visionTitle}
                            onChange={(e) => setVisionTitle(e.target.value)}
                            placeholder="Our Vision"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gold-600 focus:ring-2 focus:ring-gold-600/20 bg-white"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">Vision Text</label>
                          <textarea
                            value={visionText}
                            onChange={(e) => setVisionText(e.target.value)}
                            rows={3}
                            placeholder="Describe your vision..."
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gold-600 focus:ring-2 focus:ring-gold-600/20 bg-white"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Values Subsection */}
                    <div className="bg-white/60 rounded-lg p-4 border border-emerald-100">
                      <h4 className="text-md font-semibold text-emerald-800 mb-3">Values</h4>
                      <div className="space-y-3">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">Values Title</label>
                          <input
                            type="text"
                            value={valuesTitle}
                            onChange={(e) => setValuesTitle(e.target.value)}
                            placeholder="Our Values"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gold-600 focus:ring-2 focus:ring-gold-600/20 bg-white"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">Values (one per line)</label>
                          <textarea
                            value={valuesItems}
                            onChange={(e) => setValuesItems(e.target.value)}
                            rows={4}
                            placeholder="Compassion&#10;Integrity&#10;Excellence&#10;Service"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gold-600 focus:ring-2 focus:ring-gold-600/20 bg-white"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contact & Footer Section Group */}
                <div className="bg-gradient-to-br from-slate-50 to-gray-50 border-2 border-slate-200 rounded-xl p-6 shadow-sm">
                  <h3 className="text-xl font-bold text-slate-900 mb-5 flex items-center gap-2">
                    <span className="w-8 h-8 bg-slate-600 text-white rounded-lg flex items-center justify-center text-sm">📞</span>
                    Contact Information & Footer
                  </h3>

                  <div className="space-y-6">
                    {/* Contact Information Subsection */}
                    <div className="bg-white/60 rounded-lg p-4 border border-slate-100">
                      <h4 className="text-md font-semibold text-slate-800 mb-3">Contact Details</h4>
                      <div className="space-y-3">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                            <input
                              type="text"
                              value={contactPhone}
                              onChange={(e) => setContactPhone(e.target.value)}
                              placeholder="(046) 472-3000"
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gold-600 focus:ring-2 focus:ring-gold-600/20 bg-white"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                            <input
                              type="email"
                              value={contactEmail}
                              onChange={(e) => setContactEmail(e.target.value)}
                              placeholder="info@samsongroup.com.ph"
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gold-600 focus:ring-2 focus:ring-gold-600/20 bg-white"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">Locations (one per line)</label>
                          <textarea
                            value={contactLocations}
                            onChange={(e) => setContactLocations(e.target.value)}
                            rows={3}
                            placeholder="123 Memorial Street, Imus, Cavite&#10;456 Service Avenue, Cavite City&#10;789 Garden Lane, Rosario, Cavite"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gold-600 focus:ring-2 focus:ring-gold-600/20 bg-white"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Facebook Messenger Subsection */}
                    <div className="bg-white/60 rounded-lg p-4 border border-slate-100">
                      <h4 className="text-md font-semibold text-slate-800 mb-3">Facebook Messenger Integration</h4>
                      <div className="space-y-3">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">Facebook Messenger URL</label>
                          <input
                            type="url"
                            value={facebookMessengerUrl}
                            onChange={(e) => setFacebookMessengerUrl(e.target.value)}
                            placeholder="https://m.me/yourpagename"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gold-600 focus:ring-2 focus:ring-gold-600/20 bg-white"
                          />
                          <p className="text-xs text-gray-500 mt-1">Get your page's messenger link from Facebook</p>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">Messenger Call-to-Action Text</label>
                          <input
                            type="text"
                            value={facebookMessengerText}
                            onChange={(e) => setFacebookMessengerText(e.target.value)}
                            placeholder="Message us directly on Facebook Messenger for quick responses"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gold-600 focus:ring-2 focus:ring-gold-600/20 bg-white"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Footer Information Subsection */}
                    <div className="bg-white/60 rounded-lg p-4 border border-slate-100">
                      <h4 className="text-md font-semibold text-slate-800 mb-3">Footer Branding</h4>
                      <div className="space-y-3">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">Footer Title</label>
                          <input
                            type="text"
                            value={footerTitle}
                            onChange={(e) => setFooterTitle(e.target.value)}
                            placeholder="Samson Funeral & Cemetery Services"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gold-600 focus:ring-2 focus:ring-gold-600/20 bg-white"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">Footer Tagline</label>
                          <input
                            type="text"
                            value={footerTagline}
                            onChange={(e) => setFooterTagline(e.target.value)}
                            placeholder="Serving families with dignity since 1928"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gold-600 focus:ring-2 focus:ring-gold-600/20 bg-white"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">Copyright Text</label>
                          <input
                            type="text"
                            value={footerCopyright}
                            onChange={(e) => setFooterCopyright(e.target.value)}
                            placeholder="© 2024 Samson Group. All rights reserved."
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gold-600 focus:ring-2 focus:ring-gold-600/20 bg-white"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Footer Quick Links Subsection */}
                    <div className="bg-white/60 rounded-lg p-4 border border-slate-100">
                      <h4 className="text-md font-semibold text-slate-800 mb-3">Quick Links</h4>
                      <div className="space-y-3">
                        {footerQuickLinks.map((link, index) => (
                          <div key={index} className="flex gap-2 items-end">
                            <div className="flex-1">
                              <label className="block text-xs font-semibold text-gray-600 mb-1">Link Label</label>
                              <input
                                type="text"
                                value={link.label}
                                onChange={(e) => {
                                  const updated = [...footerQuickLinks];
                                  updated[index].label = e.target.value;
                                  setFooterQuickLinks(updated);
                                }}
                                placeholder="Label"
                                className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-gold-600 bg-white"
                              />
                            </div>
                            <div className="flex-1">
                              <label className="block text-xs font-semibold text-gray-600 mb-1">URL/Href</label>
                              <input
                                type="text"
                                value={link.href}
                                onChange={(e) => {
                                  const updated = [...footerQuickLinks];
                                  updated[index].href = e.target.value;
                                  setFooterQuickLinks(updated);
                                }}
                                placeholder="/page or #section"
                                className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-gold-600 bg-white"
                              />
                            </div>
                            <button
                              onClick={() => setFooterQuickLinks(footerQuickLinks.filter((_, i) => i !== index))}
                              className="px-3 py-2 bg-red-500 text-white rounded text-sm hover:bg-red-600 transition"
                            >
                              ✕
                            </button>
                          </div>
                        ))}
                        <button
                          onClick={() => setFooterQuickLinks([...footerQuickLinks, { label: "", href: "" }])}
                          className="w-full px-4 py-2 bg-slate-200 text-slate-800 rounded-lg hover:bg-slate-300 transition text-sm font-semibold"
                        >
                          + Add Link
                        </button>
                      </div>
                    </div>

                    {/* Footer Other Links Subsection */}
                    <div className="bg-white/60 rounded-lg p-4 border border-slate-100">
                      <h4 className="text-md font-semibold text-slate-800 mb-3">Other Links</h4>
                      <div className="space-y-3">
                        {footerOtherLinks.map((link, index) => (
                          <div key={index} className="flex gap-2 items-end">
                            <div className="flex-1">
                              <label className="block text-xs font-semibold text-gray-600 mb-1">Link Label</label>
                              <input
                                type="text"
                                value={link.label}
                                onChange={(e) => {
                                  const updated = [...footerOtherLinks];
                                  updated[index].label = e.target.value;
                                  setFooterOtherLinks(updated);
                                }}
                                placeholder="Label"
                                className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-gold-600 bg-white"
                              />
                            </div>
                            <div className="flex-1">
                              <label className="block text-xs font-semibold text-gray-600 mb-1">URL/Href</label>
                              <input
                                type="text"
                                value={link.href}
                                onChange={(e) => {
                                  const updated = [...footerOtherLinks];
                                  updated[index].href = e.target.value;
                                  setFooterOtherLinks(updated);
                                }}
                                placeholder="/page or #section"
                                className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-gold-600 bg-white"
                              />
                            </div>
                            <button
                              onClick={() => setFooterOtherLinks(footerOtherLinks.filter((_, i) => i !== index))}
                              className="px-3 py-2 bg-red-500 text-white rounded text-sm hover:bg-red-600 transition"
                            >
                              ✕
                            </button>
                          </div>
                        ))}
                        <button
                          onClick={() => setFooterOtherLinks([...footerOtherLinks, { label: "", href: "" }])}
                          className="w-full px-4 py-2 bg-slate-200 text-slate-800 rounded-lg hover:bg-slate-300 transition text-sm font-semibold"
                        >
                          + Add Link
                        </button>
                      </div>
                    </div>

                    {/* Footer Addresses Subsection */}
                    <div className="bg-white/60 rounded-lg p-4 border border-slate-100">
                      <h4 className="text-md font-semibold text-slate-800 mb-3">Office Addresses</h4>
                      <div className="space-y-3">
                        {footerAddresses.map((addr, index) => (
                          <div key={index} className="flex gap-2 items-end">
                            <div className="flex-1">
                              <label className="block text-xs font-semibold text-gray-600 mb-1">Location Label</label>
                              <input
                                type="text"
                                value={addr.label}
                                onChange={(e) => {
                                  const updated = [...footerAddresses];
                                  updated[index].label = e.target.value;
                                  setFooterAddresses(updated);
                                }}
                                placeholder="Main Office"
                                className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-gold-600 bg-white"
                              />
                            </div>
                            <div className="flex-1">
                              <label className="block text-xs font-semibold text-gray-600 mb-1">Address</label>
                              <input
                                type="text"
                                value={addr.address}
                                onChange={(e) => {
                                  const updated = [...footerAddresses];
                                  updated[index].address = e.target.value;
                                  setFooterAddresses(updated);
                                }}
                                placeholder="123 Street, City, Province"
                                className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-gold-600 bg-white"
                              />
                            </div>
                            <button
                              onClick={() => setFooterAddresses(footerAddresses.filter((_, i) => i !== index))}
                              className="px-3 py-2 bg-red-500 text-white rounded text-sm hover:bg-red-600 transition"
                            >
                              ✕
                            </button>
                          </div>
                        ))}
                        <button
                          onClick={() => setFooterAddresses([...footerAddresses, { label: "", address: "" }])}
                          className="w-full px-4 py-2 bg-slate-200 text-slate-800 rounded-lg hover:bg-slate-300 transition text-sm font-semibold"
                        >
                          + Add Address
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Save Button */}
                <div className="flex justify-end pt-4">
                  <button
                    onClick={handleSaveGeneral}
                    className="px-8 py-3 bg-gradient-to-r from-gold-600 to-gold-500 text-white font-bold rounded-lg hover:shadow-xl transition-all transform hover:scale-105"
                  >
                    💾 Save All Changes
                  </button>
                </div>
              </div>
            )}

            {/* ANNOUNCEMENTS TAB */}
            {activeTab === "announcements" && (
              <div className="space-y-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-8">Manage Announcements</h2>

                {/* Add/Edit Form */}
                <div className="bg-gradient-to-br from-orange-50 to-red-50 border-2 border-orange-200 rounded-xl p-6 shadow-sm">
                  <h3 className="text-xl font-bold text-orange-900 mb-5 flex items-center gap-2">
                    <span className="w-8 h-8 bg-orange-600 text-white rounded-lg flex items-center justify-center text-sm">📢</span>
                    {editingAnnouncement ? "Edit Announcement" : "Add New Announcement"}
                  </h3>

                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Title</label>
                        <input
                          type="text"
                          placeholder="Title"
                          value={newAnnouncement.title}
                          onChange={(e) => setNewAnnouncement({ ...newAnnouncement, title: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gold-600 focus:ring-2 focus:ring-gold-600/20 bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Priority (0-10)</label>
                        <input
                          type="number"
                          placeholder="Priority (0-10)"
                          value={newAnnouncement.priority}
                          onChange={(e) => setNewAnnouncement({ ...newAnnouncement, priority: parseInt(e.target.value) })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gold-600 focus:ring-2 focus:ring-gold-600/20 bg-white"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Image URL</label>
                        <input
                          type="text"
                          placeholder="Image URL"
                          value={newAnnouncement.image}
                          onChange={(e) => setNewAnnouncement({ ...newAnnouncement, image: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gold-600 focus:ring-2 focus:ring-gold-600/20 bg-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Announcement Content</label>
                      <textarea
                        placeholder="Announcement Content"
                        value={newAnnouncement.content}
                        onChange={(e) => setNewAnnouncement({ ...newAnnouncement, content: e.target.value })}
                        rows={4}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gold-600 focus:ring-2 focus:ring-gold-600/20 bg-white"
                      />
                    </div>
                  </div>

                  <div className="flex gap-2 mt-5">
                    <button
                      onClick={handleSaveAnnouncement}
                      className="flex-1 bg-gradient-to-r from-orange-600 to-red-600 text-white font-bold py-3 rounded-lg hover:shadow-xl transition-all transform hover:scale-105"
                    >
                      {editingAnnouncement ? "✓ Update" : "+ Create"} Announcement
                    </button>
                    {editingAnnouncement && (
                      <button
                        onClick={() => {
                          setEditingAnnouncement(null);
                          setNewAnnouncement({ title: "", content: "", image: "", priority: 0 });
                        }}
                        className="px-8 bg-gray-500 text-white font-bold py-3 rounded-lg hover:bg-gray-600 transition-all"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </div>

                {/* Announcements List */}
                <div className="grid gap-4">
                  {announcements.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">No announcements yet</p>
                  ) : (
                    announcements.map((ann) => (
                      <div key={ann.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-800">{ann.title}</h4>
                            <p className="text-sm text-gray-500">Priority: {ann.priority}</p>
                            <p className="text-sm text-gray-500 mt-1">{ann.content.substring(0, 100)}...</p>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => {
                                setEditingAnnouncement(ann);
                                setNewAnnouncement(ann);
                              }}
                              className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteAnnouncement(ann.id)}
                              className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* DIRECTORY TAB */}
            {activeTab === "directory" && (
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-gray-800 mb-8">Manage Directory</h2>

                {/* Add/Edit Form */}
                <div className="bg-gradient-to-br from-cyan-50 to-teal-50 border-2 border-cyan-200 rounded-xl p-6 shadow-sm">
                  <h3 className="text-xl font-bold text-cyan-900 mb-5 flex items-center gap-2">
                    <span className="w-8 h-8 bg-cyan-600 text-white rounded-lg flex items-center justify-center text-sm">📍</span>
                    {editingDirectory ? "Edit Entry" : "Add New Directory Entry"}
                  </h3>

                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Location Name</label>
                        <input
                          type="text"
                          placeholder="Location Name"
                          value={newDirectory.name}
                          onChange={(e) => setNewDirectory({ ...newDirectory, name: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gold-600 focus:ring-2 focus:ring-gold-600/20 bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Type</label>
                        <select
                          value={newDirectory.type}
                          onChange={(e) => setNewDirectory({ ...newDirectory, type: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gold-600 focus:ring-2 focus:ring-gold-600/20 bg-white"
                        >
                          <option>Funeral Parlor</option>
                          <option>Memorial Garden</option>
                          <option>Farm</option>
                          <option>Crematory</option>
                          <option>Branch</option>
                          <option>Service</option>
                        </select>
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Address</label>
                        <input
                          type="text"
                          placeholder="Address"
                          value={newDirectory.address}
                          onChange={(e) => setNewDirectory({ ...newDirectory, address: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gold-600 focus:ring-2 focus:ring-gold-600/20 bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Phone</label>
                        <input
                          type="tel"
                          placeholder="Phone"
                          value={newDirectory.phone}
                          onChange={(e) => setNewDirectory({ ...newDirectory, phone: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gold-600 focus:ring-2 focus:ring-gold-600/20 bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                        <input
                          type="email"
                          placeholder="Email"
                          value={newDirectory.email}
                          onChange={(e) => setNewDirectory({ ...newDirectory, email: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gold-600 focus:ring-2 focus:ring-gold-600/20 bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Hours</label>
                        <input
                          type="text"
                          placeholder="Hours"
                          value={newDirectory.hours}
                          onChange={(e) => setNewDirectory({ ...newDirectory, hours: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gold-600 focus:ring-2 focus:ring-gold-600/20 bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Image URL</label>
                        <input
                          type="text"
                          placeholder="Image URL"
                          value={newDirectory.image}
                          onChange={(e) => setNewDirectory({ ...newDirectory, image: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gold-600 focus:ring-2 focus:ring-gold-600/20 bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Latitude</label>
                        <input
                          type="number"
                          step="0.0001"
                          placeholder="Latitude"
                          value={newDirectory.latitude}
                          onChange={(e) => setNewDirectory({ ...newDirectory, latitude: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gold-600 focus:ring-2 focus:ring-gold-600/20 bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Longitude</label>
                        <input
                          type="number"
                          step="0.0001"
                          placeholder="Longitude"
                          value={newDirectory.longitude}
                          onChange={(e) => setNewDirectory({ ...newDirectory, longitude: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gold-600 focus:ring-2 focus:ring-gold-600/20 bg-white"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 mt-5">
                    <button
                      onClick={handleSaveDirectory}
                      className="flex-1 bg-gradient-to-r from-cyan-600 to-teal-600 text-white font-bold py-3 rounded-lg hover:shadow-xl transition-all transform hover:scale-105"
                    >
                      {editingDirectory ? "✓ Update" : "+ Create"} Entry
                    </button>
                    {editingDirectory && (
                      <button
                        onClick={() => {
                          setEditingDirectory(null);
                          setNewDirectory({
                            name: "",
                            type: "Funeral Parlor",
                            address: "",
                            phone: "",
                            email: "",
                            hours: "",
                            image: "",
                            latitude: "",
                            longitude: "",
                          });
                        }}
                        className="px-8 bg-gray-500 text-white font-bold py-3 rounded-lg hover:bg-gray-600 transition-all"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </div>

                {/* Directory List */}
                <div className="grid gap-4">
                  {directoryEntries.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">No directory entries yet</p>
                  ) : (
                    directoryEntries.map((entry) => (
                      <div key={entry.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-800">{entry.name}</h4>
                            <p className="text-sm text-gray-600">{entry.type}</p>
                            <p className="text-sm text-gray-500">{entry.address}</p>
                            {entry.phone && <p className="text-sm text-gray-500">Phone: {entry.phone}</p>}
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => {
                                setEditingDirectory(entry);
                                setNewDirectory(entry);
                              }}
                              className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteDirectory(entry.id)}
                              className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* OFFICERS TAB */}
            {activeTab === "officers" && (
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-gray-800 mb-8">Officers & Employees</h2>

                <div className="bg-gradient-to-br from-indigo-50 to-violet-50 border-2 border-indigo-200 rounded-xl p-6 shadow-sm">
                  <h3 className="text-xl font-bold text-indigo-900 mb-5 flex items-center gap-2">
                    <span className="w-8 h-8 bg-indigo-600 text-white rounded-lg flex items-center justify-center text-sm">👔</span>
                    {editingOfficer ? "Edit Officer" : "Add New Officer"}
                  </h3>

                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Name</label>
                        <input
                          type="text"
                          placeholder="Name"
                          value={newOfficer.name}
                          onChange={(e) => setNewOfficer({ ...newOfficer, name: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gold-600 focus:ring-2 focus:ring-gold-600/20 bg-white"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Position</label>
                        <input
                          type="text"
                          placeholder="Position"
                          value={newOfficer.position}
                          onChange={(e) => setNewOfficer({ ...newOfficer, position: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gold-600 focus:ring-2 focus:ring-gold-600/20 bg-white"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Department</label>
                        <input
                          type="text"
                          placeholder="Department"
                          value={newOfficer.department}
                          onChange={(e) => setNewOfficer({ ...newOfficer, department: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gold-600 focus:ring-2 focus:ring-gold-600/20 bg-white"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                        <input
                          type="email"
                          placeholder="Email"
                          value={newOfficer.email}
                          onChange={(e) => setNewOfficer({ ...newOfficer, email: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gold-600 focus:ring-2 focus:ring-gold-600/20 bg-white"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Phone</label>
                        <input
                          type="tel"
                          placeholder="Phone"
                          value={newOfficer.phone}
                          onChange={(e) => setNewOfficer({ ...newOfficer, phone: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gold-600 focus:ring-2 focus:ring-gold-600/20 bg-white"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Order</label>
                        <input
                          type="number"
                          placeholder="Order"
                          value={newOfficer.order}
                          onChange={(e) => setNewOfficer({ ...newOfficer, order: parseInt(e.target.value) })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gold-600 focus:ring-2 focus:ring-gold-600/20 bg-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Bio</label>
                      <textarea
                        placeholder="Bio"
                        value={newOfficer.bio}
                        onChange={(e) => setNewOfficer({ ...newOfficer, bio: e.target.value })}
                        rows={3}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gold-600 focus:ring-2 focus:ring-gold-600/20 bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Image URL</label>
                      <input
                        type="text"
                        placeholder="Image URL"
                        value={newOfficer.image}
                        onChange={(e) => setNewOfficer({ ...newOfficer, image: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gold-600 focus:ring-2 focus:ring-gold-600/20 bg-white"
                      />
                    </div>

                    <div className="flex gap-2 mt-5">
                      <button
                        onClick={handleSaveOfficer}
                        className="flex-1 bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-bold py-3 rounded-lg hover:shadow-xl transition-all transform hover:scale-105"
                      >
                        {editingOfficer ? "✓ Update" : "+ Add"} Officer
                      </button>
                      {editingOfficer && (
                        <button
                          onClick={() => {
                            setEditingOfficer(null);
                            setNewOfficer({
                              name: "",
                              position: "",
                              department: "",
                              email: "",
                              phone: "",
                              bio: "",
                              image: "",
                              order: 0,
                            });
                          }}
                          className="px-8 bg-gray-500 text-white font-bold py-3 rounded-lg hover:bg-gray-600 transition-all"
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4 text-gray-800">Officers List</h3>
                  {officers.length === 0 ? (
                    <p className="text-gray-600">No officers added yet</p>
                  ) : (
                    <div className="space-y-2">
                      {officers.map((officer) => (
                        <div
                          key={officer.id}
                          className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition"
                        >
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <h4 className="font-semibold text-gray-800">{officer.name}</h4>
                              <p className="text-sm text-gray-600">{officer.position}</p>
                              {officer.department && (
                                <p className="text-sm text-gray-500">{officer.department}</p>
                              )}
                              {officer.email && (
                                <p className="text-sm text-gray-500">Email: {officer.email}</p>
                              )}
                              {officer.phone && (
                                <p className="text-sm text-gray-500">Phone: {officer.phone}</p>
                              )}
                            </div>
                            <div className="flex gap-2">
                              <button
                                onClick={() => {
                                  setEditingOfficer(officer);
                                  setNewOfficer(officer);
                                }}
                                className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDeleteOfficer(officer.id)}
                                className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* SERVICES TAB */}
            {activeTab === "services" && (
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-gray-800 mb-8">Services Carousel</h2>

                <div className="bg-gradient-to-br from-rose-50 to-pink-50 border-2 border-rose-200 rounded-xl p-6 shadow-sm">
                  <h3 className="text-xl font-bold text-rose-900 mb-5 flex items-center gap-2">
                    <span className="w-8 h-8 bg-rose-600 text-white rounded-lg flex items-center justify-center text-sm">⚙️</span>
                    {editingService ? "Edit Service" : "Add New Service"}
                  </h3>

                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Name (Internal Use)</label>
                        <input
                          type="text"
                          placeholder="Name (for internal use)"
                          value={newService.name}
                          onChange={(e) => setNewService({ ...newService, name: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gold-600 focus:ring-2 focus:ring-gold-600/20 bg-white"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Heading (Displayed)</label>
                        <input
                          type="text"
                          placeholder="Heading (displayed on carousel)"
                          value={newService.heading}
                          onChange={(e) => setNewService({ ...newService, heading: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gold-600 focus:ring-2 focus:ring-gold-600/20 bg-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Caption (Short Description)</label>
                      <textarea
                        placeholder="Caption (short description)"
                        value={newService.caption}
                        onChange={(e) => setNewService({ ...newService, caption: e.target.value })}
                        rows={2}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gold-600 focus:ring-2 focus:ring-gold-600/20 bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Content (Full Description)</label>
                      <textarea
                        placeholder="Content (full description)"
                        value={newService.content}
                        onChange={(e) => setNewService({ ...newService, content: e.target.value })}
                        rows={3}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gold-600 focus:ring-2 focus:ring-gold-600/20 bg-white"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Image/Video URL</label>
                        <input
                          type="text"
                          placeholder="Image/Video URL"
                          value={newService.image}
                          onChange={(e) => setNewService({ ...newService, image: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gold-600 focus:ring-2 focus:ring-gold-600/20 bg-white"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Order</label>
                        <input
                          type="number"
                          placeholder="Order"
                          value={newService.order}
                          onChange={(e) => setNewService({ ...newService, order: parseInt(e.target.value) })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gold-600 focus:ring-2 focus:ring-gold-600/20 bg-white"
                        />
                      </div>
                    </div>

                    <div className="flex gap-2 mt-5">
                      <button
                        onClick={handleSaveService}
                        className="flex-1 bg-gradient-to-r from-rose-600 to-pink-600 text-white font-bold py-3 rounded-lg hover:shadow-xl transition-all transform hover:scale-105"
                      >
                        {editingService ? "✓ Update" : "+ Add"} Service
                      </button>
                      {editingService && (
                        <button
                          onClick={() => {
                            setEditingService(null);
                            setNewService({
                              name: "",
                              heading: "",
                              caption: "",
                              content: "",
                              image: "",
                              order: 0,
                            });
                          }}
                          className="px-8 bg-gray-500 text-white font-bold py-3 rounded-lg hover:bg-gray-600 transition-all"
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4 text-gray-800">Services List</h3>
                  {services.length === 0 ? (
                    <p className="text-gray-600">No services added yet</p>
                  ) : (
                    <div className="space-y-2">
                      {services.map((service) => (
                        <div
                          key={service.id}
                          className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition"
                        >
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <h4 className="font-semibold text-gray-800">{service.heading}</h4>
                              {service.caption && (
                                <p className="text-sm text-gray-600">{service.caption}</p>
                              )}
                              {service.content && (
                                <p className="text-sm text-gray-500">{service.content.substring(0, 80)}...</p>
                              )}
                              {service.image && (
                                <p className="text-xs text-gray-400 mt-2">Image: {service.image.substring(0, 50)}...</p>
                              )}
                            </div>
                            <div className="flex gap-2">
                              <button
                                onClick={() => {
                                  setEditingService(service);
                                  setNewService(service);
                                }}
                                className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDeleteService(service.id)}
                                className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* AFFILIATIONS TAB */}
            {activeTab === "affiliations" && (
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-gray-800 mb-8">Affiliations & Partnerships</h2>

                <div className="bg-gradient-to-br from-lime-50 to-green-50 border-2 border-lime-200 rounded-xl p-6 shadow-sm">
                  <h3 className="text-xl font-bold text-lime-900 mb-5 flex items-center gap-2">
                    <span className="w-8 h-8 bg-lime-600 text-white rounded-lg flex items-center justify-center text-sm">🤝</span>
                    {editingAffiliation ? "Edit Affiliation" : "Add New Affiliation"}
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Organization Name</label>
                      <input
                        type="text"
                        placeholder="Organization Name"
                        value={newAffiliation.name}
                        onChange={(e) => setNewAffiliation({ ...newAffiliation, name: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gold-600 focus:ring-2 focus:ring-gold-600/20 bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                      <textarea
                        placeholder="Description"
                        value={newAffiliation.description}
                        onChange={(e) => setNewAffiliation({ ...newAffiliation, description: e.target.value })}
                        rows={3}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gold-600 focus:ring-2 focus:ring-gold-600/20 bg-white"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Logo URL (Optional)</label>
                        <input
                          type="text"
                          placeholder="Logo URL (optional)"
                          value={newAffiliation.logo}
                          onChange={(e) => setNewAffiliation({ ...newAffiliation, logo: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gold-600 focus:ring-2 focus:ring-gold-600/20 bg-white"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Order</label>
                        <input
                          type="number"
                          placeholder="Order"
                          value={newAffiliation.order}
                          onChange={(e) => setNewAffiliation({ ...newAffiliation, order: parseInt(e.target.value) })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gold-600 focus:ring-2 focus:ring-gold-600/20 bg-white"
                        />
                      </div>
                    </div>

                    <div className="flex gap-2 mt-5">
                      <button
                        onClick={handleSaveAffiliation}
                        className="flex-1 bg-gradient-to-r from-lime-600 to-green-600 text-white font-bold py-3 rounded-lg hover:shadow-xl transition-all transform hover:scale-105"
                      >
                        {editingAffiliation ? "✓ Update" : "+ Add"} Affiliation
                      </button>
                      {editingAffiliation && (
                        <button
                          onClick={() => {
                            setEditingAffiliation(null);
                            setNewAffiliation({
                              name: "",
                              description: "",
                              logo: "",
                              order: 0,
                            });
                          }}
                          className="px-8 bg-gray-500 text-white font-bold py-3 rounded-lg hover:bg-gray-600 transition-all"
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4 text-gray-800">Affiliations List</h3>
                  {affiliations.length === 0 ? (
                    <p className="text-gray-600">No affiliations added yet</p>
                  ) : (
                    <div className="space-y-2">
                      {affiliations.map((affiliation) => (
                        <div
                          key={affiliation.id}
                          className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition"
                        >
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <h4 className="font-semibold text-gray-800">{affiliation.name}</h4>
                              {affiliation.description && (
                                <p className="text-sm text-gray-600">{affiliation.description}</p>
                              )}
                              {affiliation.logo && (
                                <p className="text-xs text-gray-400 mt-2">Logo: {affiliation.logo.substring(0, 50)}...</p>
                              )}
                            </div>
                            <div className="flex gap-2">
                              <button
                                onClick={() => {
                                  setEditingAffiliation(affiliation);
                                  setNewAffiliation(affiliation);
                                }}
                                className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDeleteAffiliation(affiliation.id)}
                                className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* CHATS TAB */}
            {activeTab === "chats" && (
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-gray-800 mb-8">Visitor Chats</h2>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Chat Sessions List */}
                  <div className="lg:col-span-1 bg-gradient-to-br from-sky-50 to-blue-50 border-2 border-sky-200 rounded-xl p-6 shadow-sm max-h-[700px] overflow-y-auto">
                    <div className="flex items-center justify-between mb-5">
                      <h3 className="text-xl font-bold text-sky-900 flex items-center gap-2">
                        <span className="w-8 h-8 bg-sky-600 text-white rounded-lg flex items-center justify-center text-sm">💬</span>
                        Chat Sessions
                      </h3>
                      <select
                        value={chatFilter}
                        onChange={(e) => setChatFilter(e.target.value)}
                        className="px-3 py-1 text-sm border border-sky-300 rounded-lg bg-white"
                      >
                        <option value="all">All</option>
                        <option value="active">Active</option>
                        <option value="closed">Closed</option>
                      </select>
                    </div>

                    {chatSessions.filter(session => 
                      chatFilter === "all" || session.status === chatFilter
                    ).length === 0 ? (
                      <p className="text-gray-500 text-center py-8">No chat sessions</p>
                    ) : (
                      <div className="space-y-2">
                        {chatSessions
                          .filter(session => chatFilter === "all" || session.status === chatFilter)
                          .map((session) => (
                          <div
                            key={session.id}
                            onClick={() => loadChatSession(session.id)}
                            className={`p-4 rounded-lg cursor-pointer transition ${
                              selectedSession?.id === session.id
                                ? "bg-sky-200 border-2 border-sky-400"
                                : "bg-white hover:bg-sky-100 border border-sky-200"
                            }`}
                          >
                            <div className="flex justify-between items-start mb-2">
                              <div className="flex-1">
                                <h4 className="font-semibold text-gray-800 flex items-center gap-2">
                                  {session.visitorName || "Anonymous"}
                                  {session.hasUnreadAdmin && (
                                    <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                                  )}
                                </h4>
                                {session.visitorEmail && (
                                  <p className="text-xs text-gray-500">{session.visitorEmail}</p>
                                )}
                              </div>
                              <span className={`text-xs px-2 py-1 rounded ${
                                session.status === "active" 
                                  ? "bg-green-100 text-green-700" 
                                  : "bg-gray-100 text-gray-600"
                              }`}>
                                {session.status}
                              </span>
                            </div>
                            <p className="text-xs text-gray-600 truncate">
                              {session.messages[0]?.content || "No messages yet"}
                            </p>
                            <p className="text-xs text-gray-400 mt-1">
                              {new Date(session.lastMessageAt).toLocaleString()}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              {session._count.messages} message{session._count.messages !== 1 ? "s" : ""}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Chat Messages */}
                  <div className="lg:col-span-2">
                    {!selectedSession ? (
                      <div className="bg-gradient-to-br from-sky-50 to-blue-50 border-2 border-sky-200 rounded-xl p-12 text-center">
                        <div className="text-6xl mb-4">💬</div>
                        <h3 className="text-xl font-bold text-gray-700 mb-2">Select a Chat Session</h3>
                        <p className="text-gray-500">Choose a conversation from the left to view and respond</p>
                      </div>
                    ) : (
                      <div className="bg-gradient-to-br from-sky-50 to-blue-50 border-2 border-sky-200 rounded-xl shadow-sm flex flex-col h-[700px]">
                        {/* Chat Header */}
                        <div className="p-6 border-b-2 border-sky-200">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="text-xl font-bold text-sky-900">
                                {selectedSession.visitorName || "Anonymous Visitor"}
                              </h3>
                              {selectedSession.visitorEmail && (
                                <p className="text-sm text-gray-600">{selectedSession.visitorEmail}</p>
                              )}
                              <p className="text-xs text-gray-500 mt-1">
                                Started: {new Date(selectedSession.createdAt).toLocaleString()}
                              </p>
                            </div>
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleUpdateChatStatus(
                                  selectedSession.id, 
                                  selectedSession.status === "active" ? "closed" : "active"
                                )}
                                className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
                                  selectedSession.status === "active"
                                    ? "bg-gray-500 text-white hover:bg-gray-600"
                                    : "bg-green-500 text-white hover:bg-green-600"
                                }`}
                              >
                                {selectedSession.status === "active" ? "Close Chat" : "Reopen Chat"}
                              </button>
                              <button
                                onClick={() => handleDeleteChatSession(selectedSession.id)}
                                className="px-4 py-2 bg-red-500 text-white rounded-lg text-sm font-semibold hover:bg-red-600 transition"
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-white/50">
                          {chatMessages.map((msg) => (
                            <div
                              key={msg.id}
                              className={`flex ${msg.role === "admin" ? "justify-end" : "justify-start"}`}
                            >
                              <div className={`max-w-[70%] ${
                                msg.role === "admin"
                                  ? "bg-sky-600 text-white"
                                  : msg.role === "assistant"
                                  ? "bg-gray-200 text-gray-800"
                                  : "bg-white text-gray-800 border border-gray-300"
                              } rounded-lg p-3 shadow-sm`}>
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="text-xs font-semibold">
                                    {msg.role === "admin" ? "You (Admin)" : msg.role === "assistant" ? "Bot" : "Visitor"}
                                  </span>
                                  <span className="text-xs opacity-70">
                                    {new Date(msg.createdAt).toLocaleTimeString()}
                                  </span>
                                </div>
                                <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Reply Input */}
                        <div className="p-4 border-t-2 border-sky-200 bg-white">
                          <div className="flex gap-2">
                            <textarea
                              value={replyMessage}
                              onChange={(e) => setReplyMessage(e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === "Enter" && !e.shiftKey) {
                                  e.preventDefault();
                                  handleSendReply();
                                }
                              }}
                              placeholder="Type your reply..."
                              rows={2}
                              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-sky-600 focus:ring-2 focus:ring-sky-600/20 bg-white resize-none"
                            />
                            <button
                              onClick={handleSendReply}
                              disabled={!replyMessage.trim()}
                              className="px-6 bg-gradient-to-r from-sky-600 to-blue-600 text-white font-bold rounded-lg hover:shadow-xl transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                            >
                              Send
                            </button>
                          </div>
                          <p className="text-xs text-gray-500 mt-2">Press Enter to send, Shift+Enter for new line</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* SETTINGS TAB */}
            {activeTab === "system-settings" && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-bold text-gray-800 mb-2">System Settings</h2>
                  <p className="text-gray-600">Configure technical settings for email delivery, notifications, and social media integration.</p>
                </div>

                {/* SMTP Configuration Section */}
                <div className="bg-gradient-to-br from-purple-50 to-indigo-50 border-2 border-purple-200 rounded-xl p-6 shadow-sm">
                  <h3 className="text-xl font-bold text-purple-900 mb-5 flex items-center gap-2">
                    <span className="w-8 h-8 bg-purple-600 text-white rounded-lg flex items-center justify-center text-sm">📧</span>
                    Email Configuration
                  </h3>
                  <p className="text-sm text-gray-600 mb-6 bg-white p-3 rounded-lg border-l-4 border-purple-600">
                    Configure your email settings to enable contact form submissions and chat notifications. These settings are stored securely in the database.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-lg border border-purple-200">
                    {/* SMTP Host */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">SMTP Server Host <span className="text-red-500">*</span></label>
                      <input
                        type="text"
                        value={smtpHost}
                        onChange={(e) => setSmtpHost(e.target.value)}
                        placeholder="e.g., smtp.gmail.com"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-600/20 bg-white"
                      />
                      <p className="text-xs text-gray-500 mt-1">The SMTP server address (e.g., smtp.gmail.com, smtp.office365.com)</p>
                    </div>

                    {/* SMTP Port */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">SMTP Port <span className="text-red-500">*</span></label>
                      <input
                        type="number"
                        value={smtpPort}
                        onChange={(e) => setSmtpPort(e.target.value)}
                        placeholder="587"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-600/20 bg-white"
                      />
                      <p className="text-xs text-gray-500 mt-1">Common ports: 587 (TLS) or 465 (SSL)</p>
                    </div>

                    {/* SMTP User */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">SMTP Username <span className="text-red-500">*</span></label>
                      <input
                        type="email"
                        value={smtpUser}
                        onChange={(e) => setSmtpUser(e.target.value)}
                        placeholder="your-email@gmail.com"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-600/20 bg-white"
                      />
                      <p className="text-xs text-gray-500 mt-1">Your email address for SMTP authentication</p>
                    </div>

                    {/* SMTP Password */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">SMTP Password <span className="text-red-500">*</span></label>
                      <input
                        type="password"
                        value={smtpPassword}
                        onChange={(e) => setSmtpPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-600/20 bg-white"
                      />
                      <p className="text-xs text-gray-500 mt-1">Use App Password for Gmail (not your regular password)</p>
                    </div>

                    {/* SMTP From Email */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Sender Email Address <span className="text-red-500">*</span></label>
                      <input
                        type="email"
                        value={smtpFromEmail}
                        onChange={(e) => setSmtpFromEmail(e.target.value)}
                        placeholder="noreply@samsongroup.com.ph"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-600/20 bg-white"
                      />
                      <p className="text-xs text-gray-500 mt-1">Email address shown as sender in notifications</p>
                    </div>

                    {/* Contact Form Inbox */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Contact Form Inbox <span className="text-red-500">*</span></label>
                      <input
                        type="email"
                        value={contactFormEmail}
                        onChange={(e) => setContactFormEmail(e.target.value)}
                        placeholder="info@samsongroup.com.ph"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-600/20 bg-white"
                      />
                      <p className="text-xs text-gray-500 mt-1">Where contact form submissions and chat notifications are sent</p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 mt-6 justify-end">
                    <button
                      onClick={handleSaveSmtpConfig}
                      disabled={!smtpHost || !smtpPort || !smtpUser || !smtpPassword || !smtpFromEmail || !contactFormEmail}
                      className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold rounded-lg hover:shadow-xl transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center gap-2"
                    >
                      <span>💾</span> Save SMTP Settings
                    </button>
                  </div>

                  {/* Info Box */}
                  <div className="mt-6 bg-blue-50 border-l-4 border-blue-600 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-900 mb-2">💡 Gmail Setup Instructions:</h4>
                    <ol className="text-sm text-blue-800 space-y-1 list-decimal list-inside">
                      <li>Enable 2-Step Verification on your Gmail account</li>
                      <li>Go to myaccount.google.com/apppasswords</li>
                      <li>Select "Mail" and "Windows Computer"</li>
                      <li>Copy the generated 16-character password and paste it above</li>
                      <li>Use your Gmail address as both SMTP Username and Sender Email</li>
                    </ol>
                  </div>
                </div>

                {/* Facebook Messenger Configuration Section */}
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-300 rounded-xl p-6 shadow-sm">
                  <h3 className="text-xl font-bold text-blue-900 mb-5 flex items-center gap-2">
                    <span className="w-8 h-8 bg-blue-600 text-white rounded-lg flex items-center justify-center text-sm">📘</span>
                    Facebook Messenger Integration
                  </h3>
                  <p className="text-sm text-gray-600 mb-6 bg-white p-3 rounded-lg border-l-4 border-blue-600">
                    Enable visitors to connect with you directly through Facebook Messenger for quick support and inquiries.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-lg border border-blue-200">
                    {/* Facebook Messenger URL */}
                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Facebook Messenger Link</label>
                      <input
                        type="url"
                        value={facebookMessengerUrl}
                        onChange={(e) => setFacebookMessengerUrl(e.target.value)}
                        placeholder="https://m.me/yourpage"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 bg-white"
                      />
                      <p className="text-xs text-gray-500 mt-1">Your Facebook Messenger link (e.g., https://m.me/samsongroup)</p>
                    </div>

                    {/* Facebook Messenger Button Text */}
                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Button Display Text</label>
                      <input
                        type="text"
                        value={facebookMessengerText}
                        onChange={(e) => setFacebookMessengerText(e.target.value)}
                        placeholder="Message us on Facebook"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 bg-white"
                      />
                      <p className="text-xs text-gray-500 mt-1">Text displayed on the Facebook Messenger button</p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 mt-6 justify-end">
                    <button
                      onClick={handleSaveGeneral}
                      disabled={!facebookMessengerUrl}
                      className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold rounded-lg hover:shadow-xl transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center gap-2"
                    >
                      <span>💾</span> Save Messenger Settings
                    </button>
                  </div>

                  {/* Info Box */}
                  <div className="mt-6 bg-blue-50 border-l-4 border-blue-600 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-900 mb-2">📘 Getting Your Messenger Link:</h4>
                    <ol className="text-sm text-blue-800 space-y-1 list-decimal list-inside">
                      <li>Go to your Facebook Business Page</li>
                      <li>Click "Inbox" or "Messages"</li>
                      <li>Your Messenger link is: https://m.me/yourpagename</li>
                      <li>Replace "yourpagename" with your actual Facebook page name</li>
                    </ol>
                  </div>
                </div>

                {/* CAPTCHA Configuration */}
                <div className="bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-300 rounded-xl p-6 shadow-sm">
                  <h3 className="text-xl font-bold text-amber-900 mb-5 flex items-center gap-2">
                    <span className="w-8 h-8 bg-amber-600 text-white rounded-lg flex items-center justify-center text-sm">🛡️</span>
                    Contact Form CAPTCHA
                  </h3>
                  <p className="text-sm text-gray-600 mb-6 bg-white p-3 rounded-lg border-l-4 border-amber-600">
                    Toggle hCaptcha protection for the contact form and set the public Site Key used by the widget.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-lg border border-amber-200">
                    {/* CAPTCHA Toggle */}
                    <div className="md:col-span-2 flex items-center justify-between gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Enable CAPTCHA</label>
                        <p className="text-xs text-gray-500">Turn on hCaptcha validation for contact form submissions.</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setCaptchaEnabled((prev) => !prev)}
                        className={`relative inline-flex h-6 w-12 items-center rounded-full transition ${
                          captchaEnabled ? "bg-amber-600" : "bg-gray-300"
                        }`}
                        aria-pressed={captchaEnabled}
                        aria-label="Toggle CAPTCHA"
                      >
                        <span
                          className={`inline-block h-5 w-5 transform rounded-full bg-white transition ${
                            captchaEnabled ? "translate-x-6" : "translate-x-1"
                          }`}
                        />
                      </button>
                    </div>

                    {/* hCaptcha Site Key */}
                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">hCaptcha Site Key</label>
                      <input
                        type="text"
                        value={hcaptchaSiteKey}
                        onChange={(e) => setHcaptchaSiteKey(e.target.value)}
                        placeholder="Enter your hCaptcha site key"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-600 focus:ring-2 focus:ring-amber-600/20 bg-white"
                      />
                      <p className="text-xs text-gray-500 mt-1">Public key from hCaptcha dashboard (safe to expose in frontend).</p>
                    </div>
                  </div>

                  <div className="flex gap-3 mt-6 justify-end">
                    <button
                      onClick={handleSaveGeneral}
                      className="px-6 py-3 bg-gradient-to-r from-amber-600 to-orange-600 text-white font-bold rounded-lg hover:shadow-xl transition-all transform hover:scale-105 flex items-center gap-2"
                    >
                      <span>💾</span> Save CAPTCHA Settings
                    </button>
                  </div>
                </div>

                {/* WhatsApp Contact */}
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-300 rounded-xl p-6 shadow-sm">
                  <h3 className="text-xl font-bold text-green-900 mb-5 flex items-center gap-2">
                    <span className="w-8 h-8 bg-green-600 text-white rounded-lg flex items-center justify-center text-sm">💬</span>
                    WhatsApp Contact
                  </h3>
                  <p className="text-sm text-gray-600 mb-6 bg-white p-3 rounded-lg border-l-4 border-green-600">
                    Configure your WhatsApp number for direct messaging and calls. This appears in the Contact section.
                  </p>

                  <div className="bg-white p-6 rounded-lg border border-green-200">
                    {/* WhatsApp Number */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">WhatsApp Number</label>
                      <input
                        type="text"
                        value={whatsappNumber}
                        onChange={(e) => setWhatsappNumber(e.target.value)}
                        placeholder="+63 XXXXXXXXXX"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-600/20 bg-white"
                      />
                      <p className="text-xs text-gray-500 mt-2">Use international format starting with country code (e.g., +63 for Philippines). Example: +63 46 471 2675</p>
                    </div>
                  </div>

                  <div className="flex gap-3 mt-6 justify-end">
                    <button
                      onClick={handleSaveGeneral}
                      className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold rounded-lg hover:shadow-xl transition-all transform hover:scale-105 flex items-center gap-2"
                    >
                      <span>💾</span> Save WhatsApp Number
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
