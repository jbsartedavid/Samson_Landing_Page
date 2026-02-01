"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import {
  FiChevronDown,
  FiSend,
  FiX,
  FiMessageCircle,
} from "react-icons/fi";
import { FaFacebook } from "react-icons/fa";
import ChatModal from "./components/ChatModal";

const emptyChat = [
  {
    role: "assistant",
    content:
      "Hello! Welcome to Samson Funeral & Cemetery Services. How can we assist you today?",
  },
];

export default function Home() {
  const [content, setContent] = useState({});
  const [loading, setLoading] = useState(true);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState(emptyChat);
  const [chatInput, setChatInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const [chatModalOpen, setChatModalOpen] = useState(false);
  const [servicesData, setServicesData] = useState(defaultServices);
  const [affiliationsData, setAffiliationsData] = useState([
    {
      name: "Philippine Funeral Directors Association",
      description: "Committed to ethical and compassionate service standards.",
    },
    {
      name: "Cavite Memorial Care Network",
      description: "Partnering for modern memorial care and facilities.",
    },
    {
      name: "National Association of Memorial Parks",
      description: "Advocating excellence in memorial park operations.",
    },
  ]);
  const legacyRef = useRef(null);
  const [legacyAnimated, setLegacyAnimated] = useState(false);
  const [legacyCounts, setLegacyCounts] = useState({ years: 0, families: 0 });
  const affiliations = affiliationsData;

  const isVideoUrl = (url = "") => {
    const lowered = url.toLowerCase();
    return lowered.endsWith(".mp4") || lowered.endsWith(".webm") || lowered.endsWith(".ogg");
  };

  useEffect(() => {
    const loadContent = async () => {
      try {
        const res = await fetch("/api/content");
        const data = await res.json();
        const contentMap = {};
        data.forEach((item) => {
          contentMap[item.key] = item.value;
        });
        setContent(contentMap);
      } catch (err) {
        console.error("Failed to load content:", err);
      }

      // Load services from API
      try {
        const servicesRes = await fetch("/api/services");
        if (servicesRes.ok) {
          const services = await servicesRes.json();
          setServicesData(Array.isArray(services) && services.length > 0 ? services : defaultServices);
        } else {
          setServicesData(defaultServices);
        }
      } catch (err) {
        console.error("Failed to load services:", err);
        setServicesData(defaultServices);
      }

      // Load affiliations from API
      try {
        const affiliationsRes = await fetch("/api/affiliations");
        if (affiliationsRes.ok) {
          const affiliations = await affiliationsRes.json();
          if (Array.isArray(affiliations) && affiliations.length > 0) {
            setAffiliationsData(affiliations);
          }
        }
      } catch (err) {
        console.error("Failed to load affiliations:", err);
      }

      setLoading(false);
    };

    loadContent();
  }, []);

  useEffect(() => {
    if (!legacyRef.current || legacyAnimated) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLegacyAnimated(true);
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(legacyRef.current);
    return () => observer.disconnect();
  }, [legacyAnimated]);

  useEffect(() => {
    if (!legacyAnimated) return;

    const duration = 1800;
    const start = performance.now();
    const targetYears = 95;
    const targetFamilies = 50;

    const animate = (time) => {
      const progress = Math.min((time - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      setLegacyCounts({
        years: Math.round(targetYears * eased),
        families: Math.round(targetFamilies * eased),
      });

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [legacyAnimated]);

  const handleSendChat = async (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMessage = {
      role: "user",
      content: chatInput,
    };

    setChatMessages((prev) => [...prev, userMessage]);
    const messageToSend = chatInput;
    setChatInput("");
    setChatLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: messageToSend, sessionId }),
      });

      const data = await res.json();
      setSessionId(data.sessionId);

      const assistantMessage = {
        role: "assistant",
        content: data.reply,
      };
      setChatMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      console.error("Chat error:", err);
      const errorMessage = {
        role: "assistant",
        content:
          "Sorry, there was an error processing your message. Please try again.",
      };
      setChatMessages((prev) => [...prev, errorMessage]);
    }

    setChatLoading(false);
  };

  const handleChatStart = (newSessionId) => {
    // Close the modal and set the session ID
    setChatModalOpen(false);
    setSessionId(newSessionId);
    setChatOpen(true);
    // Reset chat messages to initial state
    setChatMessages(emptyChat);
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
    viewport: { once: true },
  };

  const valuesList = (content.valuesItems || "Compassion\nIntegrity\nExcellence\nService")
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);

  return (
    <div
      className="min-h-screen bg-[#f7f1e6]"
      style={{
        backgroundImage:
          "radial-gradient(circle at 15% 10%, rgba(184,137,46,0.18), transparent 45%), radial-gradient(circle at 85% 15%, rgba(224,180,88,0.15), transparent 40%), radial-gradient(circle at 50% 90%, rgba(184,137,46,0.12), transparent 45%)",
      }}
    >
      {/* Navigation */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed top-0 w-full bg-black/25 backdrop-blur-xl shadow-sm z-50 border-b border-white/10"
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          {/* Logo */}
          <motion.div whileHover={{ scale: 1.02 }} className="cursor-pointer">
            <h1 className="text-2xl font-bold text-white drop-shadow">
              Samson
            </h1>
            <p className="text-xs text-[#e0b458] font-medium drop-shadow">
              Funeral & Cemetery Services
            </p>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            <motion.button
              whileHover={{ color: "#e0b458" }}
              onClick={() => scrollToSection("services")}
              className="text-white/90 font-medium transition hover:text-[#e0b458] drop-shadow"
            >
              Services
            </motion.button>

            <motion.button
              whileHover={{ color: "#e0b458" }}
              onClick={() => scrollToSection("about")}
              className="text-white/90 font-medium transition hover:text-[#e0b458] drop-shadow"
            >
              About
            </motion.button>

            <Link href="/obituaries" className="text-white/90 font-medium transition hover:text-[#e0b458] drop-shadow">
              Obituaries
            </Link>

            <Link href="/announcements" className="text-white/90 font-medium transition hover:text-[#e0b458] drop-shadow">
              Announcements
            </Link>

            <Link href="/directory" className="text-white/90 font-medium transition hover:text-[#e0b458] drop-shadow">
              Directory
            </Link>

            <Link href="/officers" className="text-white/90 font-medium transition hover:text-[#e0b458] drop-shadow">
              Officers
            </Link>

            <Link href="/contact">
              <motion.span
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block px-6 py-2.5 bg-[#b8892e] hover:bg-[#a07827] text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition cursor-pointer"
              >
                Contact Us
              </motion.span>
            </Link>

            {/* Admin Button */}
            <Link href="/admin/login">
              <motion.span
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block px-5 py-2.5 border border-[#e0b458] text-[#e0b458] font-medium rounded-lg hover:bg-[#b8892e] hover:text-white transition cursor-pointer"
              >
                Admin
              </motion.span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <motion.button className="lg:hidden text-white text-2xl drop-shadow">
            ☰
          </motion.button>
        </div>
      </motion.nav>

      {/* Hero Section with Video */}
      <motion.section
        id="hero"
        className="relative w-full min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Background Video or Image */}
        <div className="absolute inset-0 overflow-hidden">
          {content.heroVideo || isVideoUrl(content.heroImage) ? (
            <video
              className="w-full h-full object-cover opacity-70"
              autoPlay
              muted
              loop
              playsInline
              src={content.heroVideo || content.heroImage}
            />
          ) : (
            content.heroImage && (
              <motion.img
                src={content.heroImage}
                alt="Hero"
                className="w-full h-full object-cover opacity-70"
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 10 }}
              />
            )
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/10" />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-6 max-w-5xl mt-20">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-[#e0b458] font-semibold text-sm tracking-[0.3em] uppercase mb-6"
          >
            Since 1928
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 tracking-tight text-white leading-tight"
          >
            {content.heroTitle || "A Place of Peace & Remembrance"}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-gray-200 mb-12 leading-relaxed max-w-3xl mx-auto"
          >
            {content.heroSubtitle ||
              "Providing dignified, compassionate funeral and cemetery services to families across Cavite for nearly a century."}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection("services")}
              className="px-10 py-4 bg-[#b8892e] hover:bg-[#a07827] text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all"
            >
              Explore Our Services
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection("about")}
              className="px-10 py-4 border-2 border-[#b8892e] text-[#b8892e] font-semibold rounded-lg hover:bg-[#b8892e] hover:text-white transition-all"
            >
              Learn More
            </motion.button>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
        >
          <FiChevronDown className="text-[#b8892e] text-3xl opacity-50" />
        </motion.div>
      </motion.section>

      {/* About Section */}
      <motion.section
        id="about"
        className="py-24 px-6 bg-transparent"
        {...fadeInUp}
      >
        <div className="max-w-6xl mx-auto">
          <motion.div className="text-center mb-16" {...fadeInUp}>
            <p className="text-[#b8892e] font-semibold tracking-[0.2em] uppercase text-sm mb-3">
              Our Story
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-[#3f2b17]">
              About Samson Group
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div {...fadeInUp}>
              <p className="text-gray-700 text-lg leading-relaxed mb-8">
                {content.aboutText ||
                  "Samson Funeral & Cemetery Services has been serving families with dignity and compassion for nearly a century. We specialize in providing comprehensive funeral services, cemetery lot sales, columbarium facilities, and pre-need plans to honor your loved ones."}
              </p>
              <motion.div className="space-y-4">
                {[
                  content.aboutFeature1,
                  content.aboutFeature2,
                  content.aboutFeature3,
                  content.aboutFeature4,
                ]
                  .filter(Boolean)
                  .map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
                      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      viewport={{ once: true, amount: 0.4 }}
                      transition={{ delay: i * 0.08, duration: 0.6, ease: "easeOut" }}
                      className="flex items-center gap-4"
                    >
                      <div className="w-6 h-6 rounded-full bg-[#b8892e]/10 flex items-center justify-center flex-shrink-0">
                        <div className="w-2 h-2 bg-[#b8892e] rounded-full" />
                      </div>
                      <span className="text-gray-700 text-base">{item}</span>
                    </motion.div>
                  ))}
              </motion.div>
            </motion.div>

            <motion.div
              ref={legacyRef}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="bg-gradient-to-br from-[#3f2b17] to-[#5a4632] rounded-2xl p-10 text-white shadow-2xl"
            >
              <h3 className="text-3xl font-bold mb-4 text-[#e0b458]">
                {content.legacyTitle || "Our Legacy"}
              </h3>
              <p className="mb-8 text-gray-200 leading-relaxed">
                {content.legacyDescription ||
                  "Founded in 1928, we've been trusted by thousands of families to provide compassionate, professional funeral and cemetery services."}
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <p className="text-5xl font-bold text-[#e0b458] mb-2">{legacyCounts.years}+</p>
                  <p className="text-sm text-gray-300">Years of Service</p>
                </div>
                <div className="text-center">
                  <p className="text-5xl font-bold text-[#e0b458] mb-2">{legacyCounts.families}K+</p>
                  <p className="text-sm text-gray-300">Families Served</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Mission, Vision, Values */}
      <motion.section
        id="mission-vision-values"
        className="py-24 px-6 bg-transparent"
        {...fadeInUp}
      >
        <div className="max-w-6xl mx-auto">
          <motion.div className="text-center mb-16" {...fadeInUp}>
            <p className="text-[#b8892e] font-semibold tracking-[0.2em] uppercase text-sm mb-3">
              Our Purpose
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-[#3f2b17]">
              Mission, Vision & Values
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="bg-white/90 rounded-2xl shadow-sm hover:shadow-xl transition-all p-8 border border-gray-100"
            >
              <h3 className="text-2xl font-bold text-[#3f2b17] mb-4">
                {content.missionTitle || "Our Mission"}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {content.missionText ||
                  "To provide compassionate, dignified, and personalized memorial care that honors every life and supports families with empathy and excellence."}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.08 }}
              className="bg-white/90 rounded-2xl shadow-sm hover:shadow-xl transition-all p-8 border border-gray-100"
            >
              <h3 className="text-2xl font-bold text-[#3f2b17] mb-4">
                {content.visionTitle || "Our Vision"}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {content.visionText ||
                  "To be the most trusted and innovative memorial care provider in Cavite, setting the standard for service, facilities, and family support."}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.16 }}
              className="bg-white/90 rounded-2xl shadow-sm hover:shadow-xl transition-all p-8 border border-gray-100"
            >
              <h3 className="text-2xl font-bold text-[#3f2b17] mb-4">
                {content.valuesTitle || "Our Values"}
              </h3>
              <ul className="space-y-3">
                {valuesList.map((value, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-gray-700">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#b8892e]" />
                    <span className="font-medium">{value}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Affiliations Section */}
      <motion.section
        id="affiliations"
        className="py-24 px-6 bg-transparent"
        {...fadeInUp}
      >
        <div className="max-w-6xl mx-auto">
          <motion.div className="text-center mb-16" {...fadeInUp}>
            <p className="text-[#b8892e] font-semibold tracking-[0.2em] uppercase text-sm mb-3">
              Trusted & Certified
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-[#3f2b17]">
              Affiliations & Partnerships
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {affiliations.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: index * 0.08, duration: 0.6, ease: "easeOut" }}
                whileHover={{ y: -6 }}
                className="bg-white/90 rounded-2xl shadow-sm hover:shadow-xl transition-all p-8 border border-gray-100"
              >
                <div className="w-14 h-14 rounded-xl bg-[#b8892e]/10 flex items-center justify-center text-[#b8892e] font-bold text-xl mb-6">
                  {item.name
                    .split(" ")
                    .map((w) => w[0])
                    .slice(0, 2)
                    .join("")}
                </div>
                <h3 className="text-xl font-bold text-[#3f2b17] mb-3">{item.name}</h3>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Services Carousel Section */}
      <motion.section
        id="services"
        className="py-24 px-6 bg-transparent"
        {...fadeInUp}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div className="text-center mb-16" {...fadeInUp}>
            <p className="text-[#b8892e] font-semibold tracking-[0.2em] uppercase text-sm mb-3">
              What We Offer
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-[#3f2b17] mb-4">
              Our Services
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Dignified services designed to honor every life with grace and respect.
            </p>
          </motion.div>

          {servicesData && servicesData.length > 0 ? (
            <motion.div {...fadeInUp}>
              <Swiper
                modules={[Autoplay, Navigation, Pagination]}
                spaceBetween={32}
                slidesPerView={1}
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                pagination={{ clickable: true }}
                navigation
                breakpoints={{
                  640: { slidesPerView: 1 },
                  768: { slidesPerView: 2 },
                  1024: { slidesPerView: 3 },
                }}
                className="pb-16 services-swiper"
              >
                {servicesData.map((service, i) => (
                  <SwiperSlide key={i}>
                    <motion.div
                      initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
                      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ delay: i * 0.08, duration: 0.6, ease: "easeOut" }}
                      whileHover={{ y: -8 }}
                      className="group h-full"
                    >
                      <div className="relative bg-white rounded-2xl shadow-sm hover:shadow-2xl overflow-hidden h-full border border-gray-100 transition-all">
                        {service.image && (
                          <div className="relative h-64 overflow-hidden bg-gray-100">
                            {isVideoUrl(service.image) ? (
                              <video
                                src={service.image}
                                className="w-full h-full object-cover"
                                autoPlay
                                muted
                                loop
                                playsInline
                              />
                            ) : (
                              <motion.img
                                src={service.image}
                                alt={service.name}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                              />
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                          </div>
                        )}

                        <div className="p-8">
                          <h3 className="text-2xl font-bold text-[#3f2b17] mb-3">
                            {service.heading || service.name}
                          </h3>
                          <p className="text-gray-600 leading-relaxed mb-6">
                            {service.caption || service.description || service.content}
                          </p>
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full py-3 bg-[#b8892e] hover:bg-[#a07827] text-white rounded-lg font-semibold transition-all shadow-sm hover:shadow-md"
                          >
                            Learn More
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </motion.div>
          ) : (
            <div className="text-center text-gray-600">Loading services...</div>
          )}
        </div>
      </motion.section>

      {/* Contact Section */}
      <motion.section
        id="contact"
        className="py-24 px-6 bg-transparent"
        {...fadeInUp}
      >
        <div className="max-w-6xl mx-auto">
          <motion.div className="text-center mb-16" {...fadeInUp}>
            <p className="text-[#b8892e] font-semibold tracking-[0.2em] uppercase text-sm mb-3">
              Contact Us
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-[#3f2b17]">
              Get In Touch
            </h2>
          </motion.div>

          {/* Call to Action with Messaging Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-16 text-center"
          >
            {/* Captions Above */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mb-6"
            >
              <p className="text-sm font-semibold text-[#b8892e] uppercase tracking-widest">Get In Touch</p>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mt-2">
                Have Questions? We're Here to Help
              </h3>
              <p className="text-gray-600 mt-3 max-w-2xl mx-auto text-lg">
                Whether you need pre-need planning, immediate assistance, or simply want to learn more about our services, 
                our caring team is ready to support you every step of the way.
              </p>
            </motion.div>

            {/* Call to Action Button */}
            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.08, y: -3, boxShadow: "0 20px 40px rgba(184, 137, 46, 0.3)" }}
                whileTap={{ scale: 0.96 }}
                className="inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-[#b8892e] to-[#d4a574] text-white rounded-xl font-bold text-lg hover:shadow-2xl transition-all transform"
              >
                <span className="text-2xl">✉️</span>
                Send us a Message
                <span className="ml-2 text-xl">→</span>
              </motion.button>
            </Link>

            {/* Captions Below - Alternative Methods */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-8"
            >
              <p className="text-sm text-gray-600 mb-4">Or connect with us through:</p>
              <div className="flex flex-col sm:flex-row justify-center gap-4 items-center">
                <div className="flex items-center gap-2 text-gray-700">
                  <span className="text-2xl">📞</span>
                  <span className="font-semibold">Call us directly</span>
                </div>
                <span className="hidden sm:inline text-gray-400">•</span>
                <div className="flex items-center gap-2 text-gray-700">
                  <span className="text-2xl">💬</span>
                  <span className="font-semibold">Live chat available</span>
                </div>
                <span className="hidden sm:inline text-gray-400">•</span>
                <div className="flex items-center gap-2 text-gray-700">
                  <span className="text-2xl">📘</span>
                  <span className="font-semibold">Facebook Messenger</span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Options Grid */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="mt-10 grid md:grid-cols-2 gap-6"
          >
            {/* Facebook Messenger */}
            <div className="bg-white rounded-2xl p-6 shadow-md border border-gold-200 text-center">
              <div className="mx-auto mb-4 w-14 h-14 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center text-2xl">
                📘
              </div>
              <h3 className="text-xl font-bold text-[#3f2b17] mb-2">Facebook Messenger</h3>
              <p className="text-gray-600 mb-4">Message or call us on Facebook Messenger</p>
              <a
                href={content.facebookMessengerUrl || "https://m.me/samsongroup"}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition shadow"
              >
                <FaFacebook className="text-lg" /> Message on Messenger
              </a>
              <p className="text-xs text-gray-500 mt-3">{content.facebookMessengerText || "Quick responses available"}</p>
            </div>

            {/* WhatsApp */}
            <div className="bg-white rounded-2xl p-6 shadow-md border border-gold-200 text-center">
              <div className="mx-auto mb-4 w-14 h-14 rounded-2xl bg-green-100 text-green-600 flex items-center justify-center text-2xl">
                💬
              </div>
              <h3 className="text-xl font-bold text-[#3f2b17] mb-2">WhatsApp</h3>
              <p className="text-gray-600 mb-4">Chat or call us directly on WhatsApp</p>
              <a
                href={content.whatsappNumber ? `https://wa.me/${content.whatsappNumber.replace(/[^0-9]/g, '')}` : "https://wa.me/63464712675"}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition shadow"
              >
                💬 Message on WhatsApp
              </a>
              <p className="text-xs text-gray-500 mt-3">{content.whatsappNumber || "+63 46 471 2675"}</p>
            </div>
          </motion.div>

        </div>
      </motion.section>

      {/* Chat Modal */}
      <ChatModal
        isOpen={chatModalOpen}
        onClose={() => setChatModalOpen(false)}
        onChatStart={handleChatStart}
      />

      {/* Chat Widget */}
      <motion.div
        className="fixed bottom-8 right-8 z-40"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        {!chatOpen && (
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-flex items-center gap-2 px-4 py-2 bg-white text-[#3f2b17] font-semibold rounded-full shadow-lg border border-gold-200">
              <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              Live Chat
            </span>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setChatModalOpen(true)}
              className="relative p-5 bg-[#b8892e] hover:bg-[#a07827] text-white rounded-full shadow-xl hover:shadow-2xl transition"
              aria-label="Open Live Chat"
            >
              <span className="absolute inset-0 rounded-full animate-ping bg-[#b8892e]/40"></span>
              <span className="relative">
                <FiMessageCircle className="text-2xl" />
              </span>
            </motion.button>
          </div>
        )}

        {chatOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="w-96 bg-white rounded-2xl shadow-2xl flex flex-col h-96 overflow-hidden border border-gray-200"
          >
            {/* Chat Header */}
            <div className="bg-[#b8892e] p-5 flex justify-between items-center">
              <h3 className="text-white font-bold text-lg">Samson Support</h3>
              <motion.button
                whileHover={{ scale: 1.1 }}
                onClick={() => setChatOpen(false)}
                className="text-white hover:bg-black/20 p-1.5 rounded"
              >
                <FiX />
              </motion.button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {chatMessages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${
                    msg.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-xs px-4 py-2.5 rounded-2xl ${
                      msg.role === "user"
                        ? "bg-[#b8892e] text-white"
                        : "bg-white text-gray-800 shadow-sm"
                    }`}
                  >
                    {msg.content}
                  </div>
                </motion.div>
              ))}
              {chatLoading && (
                <div className="flex justify-start">
                  <div className="bg-white shadow-sm px-4 py-2.5 rounded-2xl">
                    <div className="flex gap-1">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          animate={{ y: [0, -5, 0] }}
                          transition={{
                            delay: i * 0.1,
                            repeat: Infinity,
                            duration: 0.6,
                          }}
                          className="w-2 h-2 bg-gray-400 rounded-full"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Chat Input */}
            <form
              onSubmit={handleSendChat}
              className="p-4 border-t border-gray-200 flex gap-2 bg-white"
            >
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#b8892e] focus:ring-2 focus:ring-[#b8892e]/20"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                disabled={chatLoading}
                className="p-3 bg-[#b8892e] text-white rounded-lg hover:bg-[#a07824] disabled:opacity-50 transition shadow-sm"
              >
                <FiSend />
              </motion.button>
            </form>
          </motion.div>
        )}
      </motion.div>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-[#c5a547] via-[#b8962f] to-[#8b6f47] text-white py-16 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
            {/* Company Info Column */}
            <div>
              <h3 className="text-xl font-bold mb-2">{content.footerTitle || "Samson Funeral & Cemetery Services"}</h3>
              <p className="text-sm text-gray-100 mb-4">{content.footerTagline || "Serving families with dignity since 1928"}</p>
              <p className="text-sm text-gray-200">
                Founded in 1928, Samson Group continues a proud tradition of compassionate service and dignity.
              </p>
            </div>

            {/* Quick Links Column */}
            <div>
              <h4 className="text-lg font-bold mb-4 text-[#fef3c7]">Quick Links</h4>
              <ul className="space-y-2">
                {content.footerQuickLinks && Array.isArray(JSON.parse(content.footerQuickLinks || "[]")) 
                  ? JSON.parse(content.footerQuickLinks).map((link, idx) => (
                    <li key={idx}>
                      <Link href={link.href} className="text-gray-100 hover:text-[#fef3c7] transition text-sm">
                        {link.label}
                      </Link>
                    </li>
                  ))
                  : [
                    { label: "About Us", href: "#about" },
                    { label: "Services", href: "#services" },
                    { label: "Obituaries", href: "/obituaries" },
                    { label: "Directory", href: "/directory" },
                    { label: "Contact", href: "#contact" }
                  ].map((link, idx) => (
                    <li key={idx}>
                      <Link href={link.href} className="text-gray-100 hover:text-[#fef3c7] transition text-sm">
                        {link.label}
                      </Link>
                    </li>
                  ))
                }
              </ul>
            </div>

            {/* Other Links Column */}
            <div>
              <h4 className="text-lg font-bold mb-4 text-[#fef3c7]">Other Links</h4>
              <ul className="space-y-2">
                {content.footerOtherLinks && Array.isArray(JSON.parse(content.footerOtherLinks || "[]"))
                  ? JSON.parse(content.footerOtherLinks).map((link, idx) => (
                    <li key={idx}>
                      <Link href={link.href} className="text-gray-100 hover:text-[#fef3c7] transition text-sm">
                        {link.label}
                      </Link>
                    </li>
                  ))
                  : [
                    { label: "Officers", href: "/officers" },
                    { label: "Announcements", href: "/announcements" },
                    { label: "Affiliations", href: "/affiliations" },
                    { label: "Privacy Policy", href: "#" },
                    { label: "Terms and Conditions", href: "#" }
                  ].map((link, idx) => (
                    <li key={idx}>
                      <Link href={link.href} className="text-gray-100 hover:text-[#fef3c7] transition text-sm">
                        {link.label}
                      </Link>
                    </li>
                  ))
                }
              </ul>
            </div>

            {/* Addresses Column */}
            <div>
              <h4 className="text-lg font-bold mb-4 text-[#fef3c7]">Visit Us</h4>
              <div className="space-y-4">
                {content.footerAddresses && Array.isArray(JSON.parse(content.footerAddresses || "[]"))
                  ? JSON.parse(content.footerAddresses).map((addr, idx) => (
                    <div key={idx} className="text-sm">
                      <p className="font-semibold text-[#fef3c7]">{addr.label}</p>
                      <p className="text-gray-100">{addr.address}</p>
                    </div>
                  ))
                  : [
                    { label: "Main Office", address: "123 Memorial Street, Imus, Cavite" },
                    { label: "Branch Office", address: "456 Service Avenue, Cavite City" }
                  ].map((addr, idx) => (
                    <div key={idx} className="text-sm">
                      <p className="font-semibold text-[#fef3c7]">{addr.label}</p>
                      <p className="text-gray-100">{addr.address}</p>
                    </div>
                  ))
                }
              </div>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="border-t border-gray-300/30 pt-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-center md:text-left text-sm text-gray-200">
                {content.footerCopyright || "© 2024 Samson Group. All rights reserved."}
              </p>
              <div className="flex gap-6 text-sm">
                <a href="/privacy" className="text-gray-200 hover:text-white transition">
                  Privacy Policy
                </a>
                <a href="/cookies" className="text-gray-200 hover:text-white transition">
                  Cookie Policy
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

const defaultServices = [
  {
    name: "Cremation Services",
    description: "Professional cremation services with dignified handling and care.",
    image: "https://res.cloudinary.com/samson-group/video/upload/v1640231570/servicesvid/interment_jpdhwx_fwcnuh.mp4",
  },
  {
    name: "Mausoleums",
    description: "Beautiful above-ground mausoleum options for eternal resting places.",
    image: "https://res.cloudinary.com/samson-group/video/upload/v1640231567/servicesvid/mausoleum_iby7ho_rx4veh.mp4",
  },
  {
    name: "Memorial Services",
    description: "Meaningful memorial services to honor and celebrate lives.",
    image: "https://res.cloudinary.com/samson-group/video/upload/v1640231570/servicesvid/interment_jpdhwx_fwcnuh.mp4",
  },
  {
    name: "Caskets",
    description: "Premium selection of caskets in various styles and materials.",
    image: "https://res.cloudinary.com/samson-group/video/upload/v1640231570/servicesvid/casket_oibqpx_bwxxmo.mp4",
  },
  {
    name: "Columbary Inurnment",
    description: "Elegant columbarium units for cremated remains.",
    image: "https://res.cloudinary.com/samson-group/video/upload/v1640231557/servicesvid/urnburial_spstcl_otvukx.mp4",
  },
  {
    name: "Funeral Ceremony",
    description: "Complete funeral ceremony arrangements and coordination.",
    image: "https://res.cloudinary.com/samson-group/video/upload/v1640231559/servicesvid/urnfuneralwake_dwsf22_hnyjkl.mp4",
  },
];
