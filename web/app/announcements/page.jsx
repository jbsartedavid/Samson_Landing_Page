"use client";

import { useState, useEffect } from "react";
import { FiBell } from "react-icons/fi";

export default function AnnouncementsPage() {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAnnouncements();
  }, []);

  const loadAnnouncements = async () => {
    try {
      const res = await fetch("/api/announcements");
      if (res.ok) {
        const data = await res.json();
        setAnnouncements(data);
      }
    } catch (error) {
      console.error("Error loading announcements:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gold-50 to-gold-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-gold-900 to-gold-700 text-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-4 mb-4">
            <FiBell className="text-4xl" />
            <h1 className="text-5xl font-bold">Announcements</h1>
          </div>
          <p className="text-gold-100 text-lg">Stay updated with our latest news and events</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">Loading announcements...</p>
          </div>
        ) : announcements.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No announcements at this time</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {announcements.map((ann) => (
              <div
                key={ann.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition border-l-4 border-gold-600"
              >
                <div className="flex flex-col md:flex-row">
                  {/* Image */}
                  {ann.image && (
                    <div className="md:w-1/3 relative h-64 md:h-auto bg-gray-200">
                      <img
                        src={ann.image}
                        alt={ann.title}
                        className="w-full h-full object-cover"
                      />
                      {ann.priority > 0 && (
                        <div className="absolute top-4 right-4 bg-red-600 text-white px-4 py-2 rounded-full font-semibold text-sm">
                          Priority: {ann.priority}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Content */}
                  <div className="flex-1 p-6 md:p-8">
                    <h3 className="text-3xl font-bold text-gold-900 mb-4">{ann.title}</h3>

                    <p className="text-gray-700 leading-relaxed mb-4">{ann.content}</p>

                    <div className="text-sm text-gray-500">
                      {new Date(ann.createdAt).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
