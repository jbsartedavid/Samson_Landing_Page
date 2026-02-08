"use client";

import { useEffect, useState } from "react";
import HCaptcha from "@hcaptcha/react-hcaptcha";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [errors, setErrors] = useState({});
  const [captchaToken, setCaptchaToken] = useState("");
  const [captchaKey, setCaptchaKey] = useState(0);
  const [captchaEnabled, setCaptchaEnabled] = useState(false);
  const [captchaSiteKey, setCaptchaSiteKey] = useState("");
  const siteKey = captchaSiteKey || process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY;

  useEffect(() => {
    const loadCaptchaSettings = async () => {
      try {
        const res = await fetch("/api/content");
        if (!res.ok) return;
        const data = await res.json();
        const contentMap = {};
        data.forEach((item) => {
          contentMap[item.key] = item.value;
        });
        setCaptchaEnabled(contentMap.captchaEnabled === "true");
        setCaptchaSiteKey(contentMap.hcaptchaSiteKey || "");
      } catch (error) {
        console.error("Failed to load captcha settings:", error);
      }
    };

    loadCaptchaSettings();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    if (captchaEnabled && !captchaToken) {
      newErrors.captcha = "Please complete the CAPTCHA";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      setStatus("");
      return;
    }

    setLoading(true);
    setStatus("");

    try {
      const res = await fetch("/api/contact-form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, captchaToken: captchaEnabled ? captchaToken : "" }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
        setCaptchaToken("");
        setCaptchaKey((prev) => prev + 1);
        setErrors({});
        // Auto-hide success message after 5 seconds
        setTimeout(() => setStatus(""), 5000);
      } else {
        setStatus("error");
        setTimeout(() => setStatus(""), 5000);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setStatus("error");
      setTimeout(() => setStatus(""), 5000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border-2 border-transparent bg-clip-padding border-gold-200 max-w-2xl mx-auto">
      {/* Header with Enhanced Gradient */}
      <div className="bg-gradient-to-br from-[#2b1a0e] via-[#4b2e16] to-[#b8892e] px-8 py-8 relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-deep-gold/10 rounded-full blur-2xl"></div>
        <div className="absolute -bottom-10 -left-10 w-30 h-30 bg-gold-300/10 rounded-full blur-xl"></div>
        <div className="relative z-10">
          <h3 className="text-3xl font-bold text-white mb-1">✉️ Send us a Message</h3>
          <p className="text-white/90 text-base">We'll get back to you as soon as possible</p>
          <p className="text-white/75 text-sm mt-3">Your inquiry matters to us. Share your thoughts, and let's connect.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-8 space-y-7">
        {/* Status Messages with Enhanced Styling */}
        {status === "success" && (
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-500 rounded-lg p-4 shadow-sm">
            <p className="text-green-900 font-bold text-lg">✓ Message sent successfully!</p>
            <p className="text-green-700 text-sm mt-2">Thank you for reaching out. We'll be in touch soon.</p>
          </div>
        )}

        {status === "error" && (
          <div className="bg-gradient-to-r from-red-50 to-rose-50 border-l-4 border-red-500 rounded-lg p-4 shadow-sm">
            <p className="text-red-900 font-bold text-lg">✗ Failed to send message</p>
            <p className="text-red-700 text-sm mt-2">Please try again or contact us directly.</p>
          </div>
        )}

        {/* Name Field */}
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="John Doe"
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition ${
              errors.name
                ? "border-red-500 focus:ring-red-500/20"
                : "border-gray-300 focus:border-gold-600 focus:ring-gold-600/20"
            } bg-white`}
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>

        {/* Email Field */}
        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="john@example.com"
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition ${
              errors.email
                ? "border-red-500 focus:ring-red-500/20"
                : "border-gray-300 focus:border-gold-600 focus:ring-gold-600/20"
            } bg-white`}
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        {/* Phone Field (Optional) */}
        <div>
          <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
            Phone Number <span className="text-gray-500 text-xs">(Optional)</span>
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="(046) 471-2675"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gold-600 focus:ring-2 focus:ring-gold-600/20 bg-white transition"
          />
        </div>

        {/* Subject Field */}
        <div>
          <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">
            Subject <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="How can we help?"
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition ${
              errors.subject
                ? "border-red-500 focus:ring-red-500/20"
                : "border-gray-300 focus:border-gold-600 focus:ring-gold-600/20"
            } bg-white`}
          />
          {errors.subject && <p className="text-red-500 text-sm mt-1">{errors.subject}</p>}
        </div>

        {/* Message Field */}
        <div>
          <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
            Message <span className="text-red-500">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Please share your message with us..."
            rows={5}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition resize-none ${
              errors.message
                ? "border-red-500 focus:ring-red-500/20"
                : "border-gray-300 focus:border-gold-600 focus:ring-gold-600/20"
            } bg-white`}
          />
          {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
          <p className="text-gray-500 text-xs mt-1">Minimum 10 characters required</p>
        </div>

        {/* CAPTCHA */}
        {captchaEnabled && (
          <div className="flex flex-col items-center gap-3">
            {siteKey ? (
              <HCaptcha
                key={captchaKey}
                sitekey={siteKey}
                onVerify={(token) => {
                  setCaptchaToken(token);
                  if (errors.captcha) {
                    setErrors((prev) => ({
                      ...prev,
                      captcha: "",
                    }));
                  }
                }}
                onExpire={() => {
                  setCaptchaToken("");
                  setErrors((prev) => ({
                    ...prev,
                    captcha: "Captcha expired. Please try again.",
                  }));
                }}
                onError={() => {
                  setCaptchaToken("");
                  setErrors((prev) => ({
                    ...prev,
                    captcha: "Captcha failed to load. Please refresh and try again.",
                  }));
                }}
              />
            ) : (
              <div className="w-full bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-sm text-red-700 text-center">
                CAPTCHA is enabled but not configured. Add the hCaptcha Site Key in Admin → System Settings.
              </div>
            )}
            {errors.captcha && <p className="text-red-500 text-sm">{errors.captcha}</p>}
          </div>
        )}

        {/* Submit Button with Enhanced Design */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-[#b8892e] to-[#d4a574] hover:from-[#a07827] hover:to-[#c4951f] text-white font-bold py-4 text-lg rounded-xl shadow-lg hover:shadow-2xl transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2 mt-2"
        >
          {loading ? (
            <>
              <span className="inline-block animate-spin">⏳</span>
              Sending...
            </>
          ) : (
            <>
              <span>✉️</span>
              Send Message
              <span>→</span>
            </>
          )}
        </button>

        {/* Form Info with Better Design */}
        <div className="bg-gradient-to-r from-gold-50 to-amber-50 border-2 border-gold-300 rounded-xl p-5 text-sm">
          <div className="flex gap-3 items-start">
            <span className="text-xl flex-shrink-0">⚡</span>
            <div>
              <p className="font-bold text-gold-900">Quick Response Guaranteed</p>
              <p className="text-gray-700 mt-1">We aim to respond to all inquiries within 24 hours during business days. Your message is important to us.</p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
