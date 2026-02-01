"use client";

import Link from "next/link";
import ContactForm from "../components/ContactForm";
import { motion } from "framer-motion";

export default function ContactPage() {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  return (
    <div className="min-h-screen bg-[#f7f1e6]">
      {/* Header */}
      <motion.section
        className="py-20 px-6 bg-gradient-to-br from-[#2b1a0e] via-[#4b2e16] to-[#b8892e]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <Link
            href="/"
            className="text-white/90 hover:text-white transition text-sm font-semibold mb-4 inline-flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-full"
          >
            ← Back to Home
          </Link>
          <motion.h1
            className="text-4xl md:text-5xl font-bold text-white mt-4"
            {...fadeInUp}
          >
            Get In Touch
          </motion.h1>
          <motion.p
            className="text-white/90 mt-4 text-lg max-w-2xl mx-auto"
            {...fadeInUp}
          >
            Have a question or need to discuss our services? Fill out the form below and we'll get back to you as soon as possible.
          </motion.p>
        </div>
      </motion.section>

      {/* Contact Form Section */}
      <motion.section
        className="py-20 px-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="max-w-2xl mx-auto">
          <ContactForm />
        </div>
      </motion.section>

      {/* Footer CTA */}
      <motion.section
        className="py-16 px-6 bg-gradient-to-br from-[#2b1a0e] via-[#4b2e16] to-[#b8892e]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Other Ways to Reach Us</h2>
          <p className="text-white/90 mb-8">
            Besides email, you can also connect with us through our other contact methods
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="tel:(046)471-2675"
              className="px-6 py-3 bg-gold-500 hover:bg-gold-600 text-white font-bold rounded-lg transition transform hover:scale-105"
            >
              📞 Call Us
            </a>
            <a
              href="/#contact"
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition transform hover:scale-105"
            >
              💬 Live Chat
            </a>
            <a
              href="https://m.me/samsongroup"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition transform hover:scale-105"
            >
              📘 Facebook
            </a>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
