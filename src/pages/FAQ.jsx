import React from "react";
import ResourceLayout from "../components/ResourceLayout";
import { useGlobal } from "../context/GlobalContext";

const FAQ = () => {
  const { darkMode } = useGlobal();

  const faqs = [
    {
      question: "What are your shipping options?",
      answer:
        "We currently deliver within Lagos only. Delivery is free within Lagos and handled through GIG Logistics, personal drop-offs, or your preferred dispatch service.",
    },
    {
      question: "How long does delivery take?",
      answer:
        "Orders within Lagos are typically delivered within 1–3 business days, depending on your chosen delivery method.",
    },
    {
      question: "Can I track my order?",
      answer:
        "Yes! Once your order is shipped, you’ll receive a tracking number via email. If you created an account, you can also track your order from your dashboard.",
    },
    {
      question: "Do you ship outside Lagos or Nigeria?",
      answer:
        "At the moment, we only deliver within Lagos, Nigeria. However, expansion plans are in progress.",
    },
    {
      question: "What is your return policy?",
      answer:
        "Returns are accepted within 7 days of delivery, provided the item is unused and in its original condition. Return shipping is the customer's responsibility. For damaged or missing items, contact us immediately to resolve the issue.",
    },
    {
      question: "Do you offer custom orders?",
      answer:
        "Yes, we do! If you're looking for something specific or unique, send us a message through our Contact Page.",
    },
    {
      question: "Do you offer wholesale pricing?",
      answer:
        "We provide special pricing for large or bulk orders. Please reach out via wholesale@onyitrims.com to inquire.",
    },
    {
      question: "What types of products do you sell?",
      answer:
        "We specialize in rhinestones, trims, ribbons, buttons, accessories, and various tailoring supplies, especially tailored for female clothing aesthetics.",
    },
    {
      question: "Is my information safe with you?",
      answer:
        "Absolutely. We only collect your email for order updates and newsletter purposes. We never share your data with third parties.",
    },
    {
      question: "How do I contact support?",
      answer:
        "Email us at support@onyitrims.com. We typically respond within 24 hours.",
    },
  ];

  return (
    <ResourceLayout
      title="Frequently Asked Questions"
      description="Find answers to common questions about our products, shipping, returns, and more."
    >
      <div className="space-y-8">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className={`p-6 rounded-lg ${
              darkMode ? "bg-gray-800" : "bg-gray-50"
            }`}
          >
            <h3
              className={`text-xl font-bold mb-3 ${
                darkMode ? "text-white" : ""
              }`}
            >
              {faq.question}
            </h3>
            <p className={darkMode ? "text-gray-300" : "text-gray-700"}>
              {faq.answer}
            </p>
          </div>
        ))}
      </div>
    </ResourceLayout>
  );
};

export default FAQ;
