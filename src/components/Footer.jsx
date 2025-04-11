import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaPlus,
  FaMinus,
} from "react-icons/fa";
import { HiArrowRight } from "react-icons/hi";

const Footer = () => {
  const [isMainMenuOpen, setIsMainMenuOpen] = useState(false);
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add newsletter subscription logic here
    console.log("Subscribing email:", email);
  };

  const mainMenuItems = [
    { to: "/", text: "Home" },
    { to: "/shop", text: "Shop" },
    { to: "/categories", text: "Categories" },
    { to: "/about", text: "About" },
    { to: "/contact", text: "Contact" },
  ];

  const resourceItems = [
    { to: "/faq", text: "FAQ" },
    { to: "/terms", text: "Terms of Service" },
    { to: "/privacy", text: "Privacy Policy" },
    { to: "/shipping", text: "Shipping Policy" },
    { to: "/refund", text: "Refund Policy" },
  ];

  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      {/* Social Media Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center space-x-8 mb-8">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-dun transition-colors duration-300"
          >
            <FaFacebookF className="h-6 w-6" />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-dun transition-colors duration-300"
          >
            <FaTwitter className="h-6 w-6" />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-dun transition-colors duration-300"
          >
            <FaInstagram className="h-6 w-6" />
          </a>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Main Menu Section */}
          <div className="border-b md:border-none border-gray-200 dark:border-gray-700">
            <button
              onClick={() => setIsMainMenuOpen(!isMainMenuOpen)}
              className="w-full flex items-center justify-between py-4 md:py-0 md:cursor-default"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Main Menu
              </h3>
              <span className="md:hidden">
                {isMainMenuOpen ? (
                  <FaMinus className="h-4 w-4 text-gray-600" />
                ) : (
                  <FaPlus className="h-4 w-4 text-gray-600" />
                )}
              </span>
            </button>
            <div
              className={`${
                isMainMenuOpen ? "max-h-96" : "max-h-0 md:max-h-96"
              } overflow-hidden transition-all duration-300`}
            >
              <nav className="flex flex-col space-y-3 py-4 md:py-6">
                {mainMenuItems.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    className="text-gray-600 dark:text-gray-400 hover:text-dun transition-colors duration-200"
                  >
                    {item.text}
                  </Link>
                ))}
              </nav>
            </div>
          </div>

          {/* Resources Section */}
          <div className="border-b md:border-none border-gray-200 dark:border-gray-700">
            <button
              onClick={() => setIsResourcesOpen(!isResourcesOpen)}
              className="w-full flex items-center justify-between py-4 md:py-0 md:cursor-default"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Resources
              </h3>
              <span className="md:hidden">
                {isResourcesOpen ? (
                  <FaMinus className="h-4 w-4 text-gray-600" />
                ) : (
                  <FaPlus className="h-4 w-4 text-gray-600" />
                )}
              </span>
            </button>
            <div
              className={`${
                isResourcesOpen ? "max-h-96" : "max-h-0 md:max-h-96"
              } overflow-hidden transition-all duration-300`}
            >
              <nav className="flex flex-col space-y-3 py-4 md:py-6">
                {resourceItems.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    className="text-gray-600 dark:text-gray-400 hover:text-dun transition-colors duration-200"
                  >
                    {item.text}
                  </Link>
                ))}
              </nav>
            </div>
          </div>

          {/* Contact Section */}
          <div className="border-b md:border-none border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 font-playfair mb-6">
              Contact Us
            </h3>
            <div className="space-y-3">
              <p className="text-gray-600">
                <strong>Email:</strong>{" "}
                <a href="mailto:info@onyitrims.com" className="hover:text-dun">
                  info@onyitrims.com
                </a>
              </p>
              <p className="text-gray-600">
                <strong>Phone:</strong>{" "}
                <a href="tel:+2347063165518" className="hover:text-dun">
                  +234 706 316 5518
                </a>
              </p>
              <p className="text-gray-600">
                <strong>Address:</strong> 123 Fashion Street, Lagos, Nigeria
              </p>
            </div>
          </div>

          {/* Newsletter Section */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Newsletter
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Subscribe to our newsletter for exclusive offers, new arrivals,
              and fashion tips.
            </p>
            <form onSubmit={handleSubmit} className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-3 pr-12 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-dun focus:border-dun dark:bg-gray-800 dark:text-white"
                required
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-gray-600 hover:text-dun transition-colors duration-200"
                aria-label="Subscribe to newsletter"
              >
                <HiArrowRight className="h-5 w-5" />
              </button>
            </form>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="text-center pt-8 border-t border-gray-200 dark:border-gray-800">
          <p className="text-gray-600 dark:text-gray-400">
            © {new Date().getFullYear()} Onyi Trims Nigeria, All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
