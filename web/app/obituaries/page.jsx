"use client";

import { useState, useEffect } from "react";
import { FiSearch, FiCalendar } from "react-icons/fi";

export default function ObituariesPage() {
  const [obituaries, setObituaries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedObituary, setSelectedObituary] = useState(null);

  useEffect(() => {
    loadObituaries();
  }, []);

  const loadObituaries = async () => {
    try {
      const res = await fetch("/api/obituaries");
      if (res.ok) {
        const data = await res.json();
        setObituaries(data);
      }
    } catch (error) {
      console.error("Error loading obituaries:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredObituaries = obituaries.filter((obit) =>
    obit.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    obit.deceased.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gold-50 to-gold-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-gold-900 to-gold-700 text-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-5xl font-bold mb-4">Obituaries & Memorials</h1>
          <p className="text-gold-100 text-lg">Honoring the lives and memories of those we have lost</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Search Bar */}
        <div className="mb-12">
          <div className="relative">
            <FiSearch className="absolute left-4 top-3 text-gold-600 text-xl" />
            <input
              type="text"
              placeholder="Search by name or title..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border-2 border-gold-300 rounded-lg focus:outline-none focus:border-gold-600 focus:ring-2 focus:ring-gold-600/20"
            />
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">Loading obituaries...</p>
          </div>
        ) : filteredObituaries.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No obituaries found</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredObituaries.map((obit) => (
              <div
                key={obit.id}
                onClick={() => setSelectedObituary(obit)}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition cursor-pointer transform hover:-translate-y-1"
              >
                {/* Image */}
                {obit.image && (
                  <div className="relative w-full h-48 bg-gray-200">
                    <img
                      src={obit.image}
                      alt={obit.deceased}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gold-900 mb-2">{obit.title}</h3>
                  <p className="text-lg text-gold-600 font-semibold mb-3">{obit.deceased}</p>

                  <div className="flex items-center gap-2 text-gray-600 mb-4">
                    <FiCalendar className="text-gold-600" />
                    <span>
                      {new Date(obit.dateOfDeath).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>

                  {obit.location && (
                    <p className="text-sm text-gray-600 mb-4">
                      <strong>Location:</strong> {obit.location}
                    </p>
                  )}

                  {obit.dateOfService && (
                    <p className="text-sm text-gray-600 mb-4">
                      <strong>Service:</strong>{" "}
                      {new Date(obit.dateOfService).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                  )}

                  <p className="text-gray-700 line-clamp-3">{obit.content}</p>

                  <button className="mt-4 text-gold-600 font-semibold hover:text-gold-700 transition">
                    Read Full Obituary →
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal for Full Obituary */}
      {selectedObituary && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              <button
                onClick={() => setSelectedObituary(null)}
                className="float-right text-2xl text-gray-500 hover:text-gray-700"
              >
                ×
              </button>

              {selectedObituary.image && (
                <div className="w-full h-64 bg-gray-200 rounded-lg mb-6">
                  <img
                    src={selectedObituary.image}
                    alt={selectedObituary.deceased}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              )}

              <h2 className="text-4xl font-bold text-espresso mb-4">{selectedObituary.title}</h2>
              <p className="text-2xl text-gold-600 font-semibold mb-6">{selectedObituary.deceased}</p>

              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-2 text-gray-700">
                  <FiCalendar className="text-gold-600" />
                  <span className="font-semibold">
                    Born/Passed:{" "}
                    {new Date(selectedObituary.dateOfDeath).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>

                {selectedObituary.location && (
                  <div className="text-gray-700">
                    <strong>Location:</strong> {selectedObituary.location}
                  </div>
                )}

                {selectedObituary.dateOfService && (
                  <div className="text-gray-700">
                    <strong>Service Date:</strong>{" "}
                    {new Date(selectedObituary.dateOfService).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </div>
                )}
              </div>

              <div className="prose prose-sm max-w-none">
                <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{selectedObituary.content}</p>
              </div>

              <button
                onClick={() => setSelectedObituary(null)}
                className="mt-8 w-full bg-gradient-to-r from-gold-600 to-gold-500 text-white font-semibold py-3 rounded-lg hover:shadow-lg transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
