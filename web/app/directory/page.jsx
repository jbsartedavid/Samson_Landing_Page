"use client";

import { useState, useEffect } from "react";
import { FiMapPin, FiPhone, FiMail, FiClock } from "react-icons/fi";

export default function DirectoryPage() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState("All");

  useEffect(() => {
    loadDirectory();
  }, []);

  const loadDirectory = async () => {
    try {
      const res = await fetch("/api/directory");
      if (res.ok) {
        const data = await res.json();
        setEntries(data);
      }
    } catch (error) {
      console.error("Error loading directory:", error);
    } finally {
      setLoading(false);
    }
  };

  const types = ["All", ...new Set(entries.map((e) => e.type))];

  const filteredEntries =
    filterType === "All" ? entries : entries.filter((e) => e.type === filterType);

  const funeralParlorEntries = filteredEntries.filter((e) => e.type === "Funeral Parlor");
  const memorialGardenEntries = filteredEntries.filter((e) => e.type === "Memorial Garden");
  const farmEntries = filteredEntries.filter((e) => e.type === "Farm");
  const crematorytries = filteredEntries.filter((e) => e.type === "Crematory");
  const branchEntries = filteredEntries.filter((e) => e.type === "Branch");
  const serviceEntries = filteredEntries.filter((e) => e.type === "Service");

  return (
    <div className="min-h-screen bg-gradient-to-br from-gold-50 to-gold-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-gold-900 to-gold-700 text-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-5xl font-bold mb-4">Directory</h1>
          <p className="text-gold-100 text-lg">Find our locations, cemetery, and memorial services</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Filter Buttons */}
        <div className="mb-8 flex flex-wrap gap-3 justify-center">
          {types.map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-6 py-2 rounded-lg font-semibold transition ${
                filterType === type
                  ? "bg-gold-600 text-white shadow-lg"
                  : "bg-white text-gold-600 border-2 border-gold-600 hover:bg-gold-50"
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">Loading directory...</p>
          </div>
        ) : filteredEntries.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No locations found</p>
          </div>
        ) : (
          <div className="space-y-12">
            {/* Funeral Parlor */}
            {funeralParlorEntries.length > 0 && (
              <section>
                <h2 className="text-3xl font-bold text-gold-900 mb-6 pb-3 border-b-4 border-gold-600">
                  Funeral Parlors
                </h2>
                <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-6">
                  {funeralParlorEntries.map((entry) => (
                    <DirectoryCard key={entry.id} entry={entry} />
                  ))}
                </div>
              </section>
            )}

            {/* Memorial Garden */}
            {memorialGardenEntries.length > 0 && (
              <section>
                <h2 className="text-3xl font-bold text-gold-900 mb-6 pb-3 border-b-4 border-gold-600">
                  Memorial Gardens
                </h2>
                <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-6">
                  {memorialGardenEntries.map((entry) => (
                    <DirectoryCard key={entry.id} entry={entry} />
                  ))}
                </div>
              </section>
            )}

            {/* Farm */}
            {farmEntries.length > 0 && (
              <section>
                <h2 className="text-3xl font-bold text-gold-900 mb-6 pb-3 border-b-4 border-gold-600">
                  Farms
                </h2>
                <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-6">
                  {farmEntries.map((entry) => (
                    <DirectoryCard key={entry.id} entry={entry} />
                  ))}
                </div>
              </section>
            )}

            {/* Crematory */}
            {crematorytries.length > 0 && (
              <section>
                <h2 className="text-3xl font-bold text-gold-900 mb-6 pb-3 border-b-4 border-gold-600">
                  Crematory Services
                </h2>
                <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-6">
                  {crematorytries.map((entry) => (
                    <DirectoryCard key={entry.id} entry={entry} />
                  ))}
                </div>
              </section>
            )}

            {/* Branch */}
            {branchEntries.length > 0 && (
              <section>
                <h2 className="text-3xl font-bold text-gold-900 mb-6 pb-3 border-b-4 border-gold-600">
                  Branches
                </h2>
                <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-6">
                  {branchEntries.map((entry) => (
                    <DirectoryCard key={entry.id} entry={entry} />
                  ))}
                </div>
              </section>
            )}

            {/* Service */}
            {serviceEntries.length > 0 && (
              <section>
                <h2 className="text-3xl font-bold text-gold-900 mb-6 pb-3 border-b-4 border-gold-600">
                  Services
                </h2>
                <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-6">
                  {serviceEntries.map((entry) => (
                    <DirectoryCard key={entry.id} entry={entry} />
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function DirectoryCard({ entry }) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition">
      {/* Image */}
      {entry.image && (
        <div className="relative w-full h-48 bg-gray-200">
          <img
            src={entry.image}
            alt={entry.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 right-4 bg-gold-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
            {entry.type}
          </div>
        </div>
      )}

      {/* Content */}
      <div className="p-6">
        <h3 className="text-2xl font-bold text-gold-900 mb-4">{entry.name}</h3>

        {/* Address */}
        <div className="flex gap-3 mb-4">
          <FiMapPin className="text-gold-600 text-xl flex-shrink-0 mt-1" />
          <div>
            <p className="font-semibold text-gray-800">Address</p>
            <p className="text-gray-600">{entry.address}</p>
            {entry.latitude && entry.longitude && (
              <a
                href={`https://maps.google.com/?q=${entry.latitude},${entry.longitude}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold-600 hover:text-gold-700 text-sm font-semibold mt-2 inline-block"
              >
                View on Google Maps →
              </a>
            )}
          </div>
        </div>

        {/* Phone */}
        {entry.phone && (
          <div className="flex gap-3 mb-4">
            <FiPhone className="text-gold-600 text-xl flex-shrink-0 mt-1" />
            <div>
              <p className="font-semibold text-gray-800">Phone</p>
              <a
                href={`tel:${entry.phone}`}
                className="text-gray-600 hover:text-gold-600 transition"
              >
                {entry.phone}
              </a>
            </div>
          </div>
        )}

        {/* Email */}
        {entry.email && (
          <div className="flex gap-3 mb-4">
            <FiMail className="text-gold-600 text-xl flex-shrink-0 mt-1" />
            <div>
              <p className="font-semibold text-gray-800">Email</p>
              <a
                href={`mailto:${entry.email}`}
                className="text-gray-600 hover:text-gold-600 transition"
              >
                {entry.email}
              </a>
            </div>
          </div>
        )}

        {/* Hours */}
        {entry.hours && (
          <div className="flex gap-3 mb-4">
            <FiClock className="text-gold-600 text-xl flex-shrink-0 mt-1" />
            <div>
              <p className="font-semibold text-gray-800">Hours</p>
              <p className="text-gray-600 whitespace-pre-wrap">{entry.hours}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
