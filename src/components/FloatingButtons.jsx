import React, { useState, useEffect } from "react";
import { HiArrowUp, HiMoon, HiSun } from "react-icons/hi";
import { useGlobal } from "../context/GlobalContext";

const FloatingButtons = () => {
  const [showButtons, setShowButtons] = useState(false);
  const { darkMode, toggleDarkMode } = useGlobal();

  // Scroll position tracking
  useEffect(() => {
    const handleScroll = () => {
      // Show buttons when scrolled down 300px or when footer is visible
      const scrollY = window.scrollY;
      const pageHeight = document.body.scrollHeight;
      const windowHeight = window.innerHeight;
      const footerPosition = pageHeight - windowHeight - 300; // Roughly 300px before footer

      setShowButtons(scrollY > 300 || scrollY > footerPosition);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!showButtons) return null;

  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col gap-3">
      <button
        onClick={toggleDarkMode}
        className="p-3 bg-dun text-white rounded-full shadow-lg hover:bg-dun/90 transition-all duration-300"
        aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
      >
        {darkMode ? (
          <HiSun className="w-6 h-6" />
        ) : (
          <HiMoon className="w-6 h-6" />
        )}
      </button>
      <button
        onClick={scrollToTop}
        className="p-3 bg-gray-800 text-white rounded-full shadow-lg hover:bg-gray-700 transition-all duration-300"
        aria-label="Scroll to top"
      >
        <HiArrowUp className="w-6 h-6" />
      </button>
    </div>
  );
};

export default FloatingButtons;
