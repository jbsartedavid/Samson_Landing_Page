"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiMail, FiPhone } from "react-icons/fi";

export default function OfficersPage() {
  const [officers, setOfficers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOfficers();
  }, []);

  const loadOfficers = async () => {
    try {
      const res = await fetch("/api/officers");
      if (res.ok) {
        const data = await res.json();
        setOfficers(data);
      }
    } catch (error) {
      console.error("Error loading officers:", error);
    } finally {
      setLoading(false);
    }
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
    viewport: { once: true },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gold-50 to-gold-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-gold-900 to-gold-700 text-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-5xl font-bold mb-4">Our Leadership Team</h1>
          <p className="text-gold-100 text-lg">
            Dedicated professionals committed to serving families with compassion and excellence
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-16">
        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">Loading officers...</p>
          </div>
        ) : officers.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No officers found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {officers.map((officer, index) => (
              <motion.div
                key={officer.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition h-full">
                  {/* Image */}
                  {officer.image ? (
                    <div className="relative w-full h-80 bg-gradient-to-br from-gold-900 to-gold-700 overflow-hidden">
                      <motion.img
                        src={officer.image}
                        alt={officer.name}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.4 }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gold-900/80 via-transparent to-transparent" />
                    </div>
                  ) : (
                    <div className="w-full h-80 bg-gradient-to-br from-gold-900 to-gold-700 flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-20 h-20 rounded-full bg-gold-800/50 mx-auto mb-4" />
                        <p className="text-gold-200 font-semibold">{officer.name.charAt(0)}</p>
                      </div>
                    </div>
                  )}

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-gold-900 mb-2">{officer.name}</h3>
                    <p className="text-lg text-gold-600 font-semibold mb-1">{officer.position}</p>
                    
                    {officer.department && (
                      <p className="text-sm text-gray-600 mb-4">{officer.department}</p>
                    )}

                    {officer.bio && (
                      <p className="text-gray-700 text-sm mb-4 leading-relaxed">{officer.bio}</p>
                    )}

                    {/* Contact Info */}
                    <div className="space-y-2 pt-4 border-t border-gold-200">
                      {officer.email && (
                        <motion.a
                          href={`mailto:${officer.email}`}
                          whileHover={{ x: 4 }}
                          className="flex items-center gap-2 text-gray-600 hover:text-gold-600 transition"
                        >
                          <FiMail className="text-lg flex-shrink-0" />
                          <span className="text-sm">{officer.email}</span>
                        </motion.a>
                      )}

                      {officer.phone && (
                        <motion.a
                          href={`tel:${officer.phone}`}
                          whileHover={{ x: 4 }}
                          className="flex items-center gap-2 text-gray-600 hover:text-gold-600 transition"
                        >
                          <FiPhone className="text-lg flex-shrink-0" />
                          <span className="text-sm">{officer.phone}</span>
                        </motion.a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
