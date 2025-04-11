import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useGlobal } from "../context/GlobalContext";

const ResourceLayout = ({ children, title, description }) => {
  const { darkMode } = useGlobal();
  const location = useLocation();

  const resources = [
    { path: "/faq", label: "FAQ" },
    { path: "/terms-of-service", label: "Terms of Service" },
    { path: "/privacy-policy", label: "Privacy Policy" },
    { path: "/shipping-policy", label: "Shipping Policy" },
    { path: "/refund-policy", label: "Refund Policy" },
  ];

  return (
    <div className="pt-36 md:pt-40">
      {/* Hero Section */}
      <div
        className={`${
          darkMode ? "bg-[#343E3D]" : "bg-gradient-to-r from-dun/10 to-dun/5"
        } py-16`}
      >
        <div className="container mx-auto px-4 max-w-6xl">
          <h1
            className={`text-4xl md:text-5xl font-bold font-lora mb-6 ${
              darkMode ? "text-white" : ""
            }`}
          >
            {title}
          </h1>
          {description && (
            <p
              className={`text-lg ${
                darkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              {description}
            </p>
          )}
        </div>
      </div>

      {/* Content Section */}
      <div className={`py-16 ${darkMode ? "bg-[#343E3D]" : "bg-white"}`}>
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar Navigation */}
            <div className="lg:col-span-1">
              <nav className="sticky top-24">
                <ul className="space-y-2">
                  {resources.map((resource) => (
                    <li key={resource.path}>
                      <Link
                        to={resource.path}
                        className={`block px-4 py-2 rounded-lg transition-colors duration-200 ${
                          location.pathname === resource.path
                            ? darkMode
                              ? "bg-[#607466] text-white"
                              : "bg-dun text-white"
                            : darkMode
                            ? "text-white hover:bg-[#607466]/20"
                            : "hover:bg-dun/10"
                        }`}
                      >
                        {resource.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <div
                className={`prose max-w-none ${darkMode ? "prose-invert" : ""}`}
              >
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourceLayout;
