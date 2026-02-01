"use client";

import { useState } from "react";

export default function ChatModal({ isOpen, onClose, onChatStart }) {
  const [formData, setFormData] = useState({
    visitorName: "",
    visitorEmail: "",
    initialMessage: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
    setError("");
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.visitorName.trim()) {
      newErrors.visitorName = "Name is required";
    }

    if (!formData.visitorEmail.trim()) {
      newErrors.visitorEmail = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.visitorEmail)) {
      newErrors.visitorEmail = "Please enter a valid email";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleStartChat = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/chat/init", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        // Call the callback with session ID
        onChatStart(data.sessionId);
        // Reset form
        setFormData({
          visitorName: "",
          visitorEmail: "",
          initialMessage: "",
        });
        setErrors({});
      } else {
        setError(data.message || "Failed to start chat. Please try again.");
      }
    } catch (err) {
      console.error("Error starting chat:", err);
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-sky-600 to-blue-600 px-6 py-6 text-white flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">Start a Chat</h2>
            <p className="text-sky-100 text-sm mt-1">Connect with our team</p>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:bg-white/20 w-8 h-8 rounded-full flex items-center justify-center transition"
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleStartChat} className="p-6 space-y-5">
          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-300 rounded-lg p-4">
              <p className="text-red-800 text-sm">{error}</p>
            </div>
          )}

          {/* Name Field */}
          <div>
            <label htmlFor="visitorName" className="block text-sm font-semibold text-gray-700 mb-2">
              Your Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="visitorName"
              name="visitorName"
              value={formData.visitorName}
              onChange={handleChange}
              placeholder="John Doe"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition ${
                errors.visitorName
                  ? "border-red-500 focus:ring-red-500/20"
                  : "border-gray-300 focus:border-sky-600 focus:ring-sky-600/20"
              } bg-white`}
            />
            {errors.visitorName && <p className="text-red-500 text-sm mt-1">{errors.visitorName}</p>}
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="visitorEmail" className="block text-sm font-semibold text-gray-700 mb-2">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="visitorEmail"
              name="visitorEmail"
              value={formData.visitorEmail}
              onChange={handleChange}
              placeholder="john@example.com"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition ${
                errors.visitorEmail
                  ? "border-red-500 focus:ring-red-500/20"
                  : "border-gray-300 focus:border-sky-600 focus:ring-sky-600/20"
              } bg-white`}
            />
            {errors.visitorEmail && <p className="text-red-500 text-sm mt-1">{errors.visitorEmail}</p>}
          </div>

          {/* Initial Message Field (Optional) */}
          <div>
            <label htmlFor="initialMessage" className="block text-sm font-semibold text-gray-700 mb-2">
              Initial Message <span className="text-gray-500 text-xs">(Optional)</span>
            </label>
            <textarea
              id="initialMessage"
              name="initialMessage"
              value={formData.initialMessage}
              onChange={handleChange}
              placeholder="Tell us how we can help..."
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-sky-600 focus:ring-2 focus:ring-sky-600/20 bg-white resize-none transition"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-gradient-to-r from-sky-600 to-blue-600 text-white font-semibold py-2 rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <span className="inline-block animate-spin">⏳</span>
                  Starting...
                </>
              ) : (
                <>
                  <span>💬</span>
                  Start Chat
                </>
              )}
            </button>
          </div>

          {/* Info */}
          <div className="bg-sky-50 border border-sky-200 rounded-lg p-4 text-sm text-sky-800">
            <p>
              <strong>Our team is here to help!</strong> We're typically available during business hours and will respond to your messages promptly.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
