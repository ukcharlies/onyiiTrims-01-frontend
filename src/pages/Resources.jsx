
import React, { useState } from "react";
import { useGlobal } from "../context/GlobalContext";
import { HiChevronDown, HiChevronUp } from "react-icons/hi";

const Resources = () => {
  const { darkMode } = useGlobal();
  const [activeSection, setActiveSection] = useState("faq");
  const [expandedFaqs, setExpandedFaqs] = useState({});

  // FAQ data structure
  const faqs = [
    {
      question: "What are your shipping options?",
      answer: "We currently deliver within Lagos only. Delivery is free within Lagos and handled through GIG Logistics, personal drop-offs, or your preferred dispatch service."
    },
    // ...add other FAQs
  ];

  // Toggle FAQ item
  const toggleFaq = (index) => {
    setExpandedFaqs(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  return (
    <div className="pt-36 md:pt-40">
      {/* Hero Section */}
      <div className={`${darkMode ? "bg-[#343E3D]" : "bg-gradient-to-r from-dun/10 to-dun/5"} py-16 md:py-24`}>
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className={`text-4xl md:text-5xl font-bold font-lora mb-6 ${darkMode ? "text-white" : ""}`}>
              Resources & Help Center
            </h1>
            <p className={`text-lg ${darkMode ? "text-gray-300" : "text-gray-700"} mb-8`}>
              Everything you need to know about our services, policies, and how we can help you.
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className={`border-b ${darkMode ? "border-gray-700" : "border-gray-200"}`}>
        <div className="container mx-auto px-4 max-w-6xl">
          <nav className="flex space-x-8">
            {["faq", "shipping", "returns", "terms", "privacy"].map((section) => (
              <button
                key={section}
                onClick={() => setActiveSection(section)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                  activeSection === section
                    ? `border-dun ${darkMode ? "text-white" : "text-gray-900"}`