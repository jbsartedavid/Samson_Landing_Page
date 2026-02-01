import { useEffect, useMemo, useState } from "react";

const emptyChat = [
  {
    role: "assistant",
    content:
      "Hello! I’m Samson’s AI support. How can I help you today?",
  },
];

const parseValue = (value) => {
  if (!value) return value;
  const trimmed = value.trim();
  if (!trimmed) return value;
  if (trimmed.startsWith("{") || trimmed.startsWith("[")) {
    try {
      return JSON.parse(trimmed);
    } catch (error) {
      return value;
    }
  }
  return value;
};

const contentToMap = (items) => {
  const map = {};
  items.forEach((item) => {
    map[item.key] = parseValue(item.value);
  });
  return map;
};

export default function App() {
  const [content, setContent] = useState({});
  const [loading, setLoading] = useState(true);
  const [leadStatus, setLeadStatus] = useState("idle");
  const [chatSessionId, setChatSessionId] = useState(null);
  const [chatMessages, setChatMessages] = useState(emptyChat);
  const [chatInput, setChatInput] = useState("");
  const [saving, setSaving] = useState(false);

  const solutions = useMemo(() => content.solutions || [], [content]);
  const stats = useMemo(() => content.stats || [], [content]);
  const branches = useMemo(() => content.branches || [], [content]);
  const timeline = useMemo(() => content.historyTimeline || [], [content]);
  const socialLinks = useMemo(() => content.socialLinks || [], [content]);

  useEffect(() => {
    const load = async () => {
      try {
        const response = await fetch("/api/content");
        const data = await response.json();
        setContent(contentToMap(data));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const updateContent = async (key, value) => {
    setSaving(true);
    try {
      const response = await fetch(`/api/content/${key}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ value }),
      });
      const data = await response.json();
      setContent((prev) => ({ ...prev, [key]: parseValue(data.value) }));
    } catch (error) {
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  const submitLead = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const payload = Object.fromEntries(formData.entries());
    setLeadStatus("loading");
    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        throw new Error("Failed to send");
      }
      setLeadStatus("success");
      event.target.reset();
    } catch (error) {
      console.error(error);
      setLeadStatus("error");
    }
  };

  const sendChat = async () => {
    if (!chatInput.trim()) return;
    const current = chatInput;
    setChatInput("");
    setChatMessages((prev) => [...prev, { role: "user", content: current }]);
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId: chatSessionId, message: current }),
      });
      const data = await response.json();
      setChatSessionId(data.sessionId);
      setChatMessages(data.messages);
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return (
      <div className="app">
        <div className="loader">Loading Samson experience...</div>
      </div>
    );
  }

  return (
    <div className="app">
      <header className="hero">
        <nav className="nav">
          <div className="logo">Samson</div>
          <div className="nav-links">
            <a href="#about">About</a>
            <a href="#solutions">Solutions</a>
            <a href="#branches">Branches</a>
            <a href="#contact">Contact</a>
          </div>
          <button className="nav-cta">Book a Visit</button>
        </nav>

        <div className="hero-grid">
          <div className="hero-copy">
            <p className="tag">Samson Group of Companies</p>
            <h1>{content.heroTitle || "Samson Group of Companies"}</h1>
            <p className="subtitle">{content.heroSubtitle}</p>
            <div className="hero-actions">
              <button className="primary">
                {content.heroCtaPrimary || "Schedule a Consultation"}
              </button>
              <button className="ghost">
                {content.heroCtaSecondary || "Explore Our Services"}
              </button>
            </div>
            <div className="stats">
              {stats.map((stat) => (
                <div className="stat" key={stat.label}>
                  <span>{stat.value}</span>
                  <p>{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="hero-card">
            <h3>Compassionate Care, Modern Support</h3>
            <p>
              From memorial gardens to vigil spaces, Samson brings together
              heritage, innovation, and personalized guidance for every family.
            </p>
            <div className="card-row">
              <div>
                <span className="card-label">Response Time</span>
                <strong>Under 2 minutes</strong>
              </div>
              <div>
                <span className="card-label">Care Specialists</span>
                <strong>24/7 Availability</strong>
              </div>
            </div>
            <button className="primary full">Chat with Support</button>
          </div>
        </div>
      </header>

      <section className="section" id="about">
        <div className="section-title">
          <p>Our Story</p>
          <h2>{content.aboutTitle}</h2>
        </div>
        <div className="about-grid">
          <p className="about-text">{content.aboutText}</p>
          <div className="timeline">
            {timeline.map((item) => (
              <div className="timeline-item" key={item.year}>
                <span>{item.year}</span>
                <div>
                  <h4>{item.title}</h4>
                  <p>{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section muted" id="solutions">
        <div className="section-title">
          <p>Digital Solutions</p>
          <h2>Modernize the care experience</h2>
        </div>
        <div className="solutions">
          {solutions.map((solution) => (
            <div className="solution-card" key={solution.title}>
              <h3>{solution.title}</h3>
              <p>{solution.description}</p>
              <button className="text-button">Learn more</button>
            </div>
          ))}
        </div>
      </section>

      <section className="section" id="branches">
        <div className="section-title">
          <p>Locations</p>
          <h2>Branches and memorial sites</h2>
        </div>
        <div className="branch-grid">
          {branches.map((branch) => (
            <div className="branch-card" key={branch.name}>
              <h3>{branch.name}</h3>
              <p>{branch.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section muted" id="crm">
        <div className="section-title">
          <p>AI Chat Support</p>
          <h2>Real-time CRM conversations</h2>
        </div>
        <div className="crm-grid">
          <div>
            <p className="about-text">
              Provide instant guidance and capture every inquiry with an
              integrated AI assistant. Conversations are logged in the CRM so
              your team never misses a follow-up.
            </p>
            <div className="pill-row">
              <span>Inquiry Capture</span>
              <span>Branch Routing</span>
              <span>Service Recommendations</span>
              <span>24/7 Support</span>
            </div>
          </div>
          <div className="chat-widget">
            <div className="chat-header">Samson AI Support</div>
            <div className="chat-body">
              {chatMessages.map((message, index) => (
                <div
                  key={`${message.role}-${index}`}
                  className={`chat-message ${message.role}`}
                >
                  <span>{message.content}</span>
                </div>
              ))}
            </div>
            <div className="chat-input">
              <input
                value={chatInput}
                onChange={(event) => setChatInput(event.target.value)}
                placeholder="Ask about services, branches, or memorial plans..."
              />
              <button className="primary" onClick={sendChat}>
                Send
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="content">
        <div className="section-title">
          <p>Content Studio</p>
          <h2>Manage your descriptions instantly</h2>
        </div>
        <div className="content-editor">
          <div>
            <label>Hero Title</label>
            <input
              defaultValue={content.heroTitle}
              onBlur={(event) => updateContent("heroTitle", event.target.value)}
            />
          </div>
          <div>
            <label>Hero Subtitle</label>
            <textarea
              defaultValue={content.heroSubtitle}
              onBlur={(event) =>
                updateContent("heroSubtitle", event.target.value)
              }
            />
          </div>
          <div>
            <label>About Text</label>
            <textarea
              defaultValue={content.aboutText}
              onBlur={(event) => updateContent("aboutText", event.target.value)}
            />
          </div>
          <div>
            <label>Contact Email</label>
            <input
              defaultValue={content.contactEmail}
              onBlur={(event) =>
                updateContent("contactEmail", event.target.value)
              }
            />
          </div>
          <div className="status">
            {saving ? "Saving..." : "Changes are saved automatically."}
          </div>
        </div>
      </section>

      <section className="section muted" id="contact">
        <div className="section-title">
          <p>Contact</p>
          <h2>Start a conversation with our care team</h2>
        </div>
        <div className="contact-grid">
          <form className="contact-form" onSubmit={submitLead}>
            <input name="name" placeholder="Full Name" required />
            <input name="email" placeholder="Email Address" required />
            <input name="phone" placeholder="Phone Number" />
            <textarea
              name="message"
              placeholder="Tell us how we can help"
              rows="4"
              required
            />
            <button className="primary" type="submit">
              Send Inquiry
            </button>
            {leadStatus === "success" && (
              <p className="success">Thank you. We will reach out shortly.</p>
            )}
            {leadStatus === "error" && (
              <p className="error">Please try again in a moment.</p>
            )}
          </form>
          <div className="contact-card">
            <h3>Samson Support</h3>
            <p>{content.contactAddress}</p>
            <div className="contact-details">
              <div>
                <span>Email</span>
                <strong>{content.contactEmail}</strong>
              </div>
              <div>
                <span>Phone</span>
                <strong>{content.contactPhone}</strong>
              </div>
            </div>
            <div className="social">
              {socialLinks.map((link) => (
                <a key={link.name} href={link.url} target="_blank">
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div>
          <strong>Samson Group of Companies</strong>
          <p>Service with love and care, from our family to yours.</p>
        </div>
        <div className="footer-links">
          <a href="#about">About</a>
          <a href="#solutions">Solutions</a>
          <a href="#branches">Branches</a>
          <a href="#contact">Contact</a>
        </div>
      </footer>
    </div>
  );
}
