"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function CookiePolicy() {
  const [policy, setPolicy] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPolicy = async () => {
      try {
        const res = await fetch("/api/content");
        if (res.ok) {
          const data = await res.json();
          const policyData = {
            title: "",
            content: "",
          };

          data.forEach((item) => {
            if (item.key === "cookiePolicyTitle") {
              policyData.title = item.value;
            }
            if (item.key === "cookiePolicyContent") {
              policyData.content = item.value;
            }
          });

          setPolicy(policyData);
        }
      } catch (error) {
        console.error("Error loading cookie policy:", error);
      } finally {
        setLoading(false);
      }
    };

    loadPolicy();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-espresso to-deep-gold flex items-center justify-center">
        <div className="text-gold-300 text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-espresso to-deep-gold">
      {/* Header */}
      <div className="bg-gradient-to-r from-espresso to-deep-gold py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <Link href="/" className="text-gold-300 hover:text-white transition text-sm font-semibold mb-4 inline-block">
            ← Back to Home
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-gold-300 mt-4">
            {policy?.title || "Cookie Policy"}
          </h1>
          <p className="text-gold-100 mt-4 text-lg">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="py-12 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          {policy?.content ? (
            <div className="prose prose-lg max-w-none">
              {policy.content.split("\n\n").map((paragraph, index) => (
                <div key={index} className="mb-6">
                  {paragraph.startsWith("#") ? (
                    <h2 className="text-3xl font-bold text-gray-800 mb-4 mt-8">
                      {paragraph.replace(/^#+\s*/, "")}
                    </h2>
                  ) : paragraph.startsWith("##") ? (
                    <h3 className="text-2xl font-bold text-gray-800 mb-3 mt-6">
                      {paragraph.replace(/^#+\s*/, "")}
                    </h3>
                  ) : (
                    <p className="text-gray-700 leading-relaxed">{paragraph}</p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-gray-100 rounded-lg p-8 text-center">
              <p className="text-gray-600">Cookie policy content not available.</p>
            </div>
          )}
        </div>
      </div>

      {/* Footer CTA */}
      <div className="bg-gradient-to-r from-espresso to-deep-gold py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gold-300 mb-4">Have Questions About Cookies?</h2>
          <p className="text-gold-100 mb-6">Contact us for more information about how we use cookies</p>
          <Link
            href="/#contact"
            className="inline-block bg-gold-500 hover:bg-gold-600 text-white font-bold py-3 px-8 rounded-lg transition transform hover:scale-105"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}
