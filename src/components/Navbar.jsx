import {
  HiSearch,
  HiShoppingCart,
  HiUser,
  HiHome,
  HiX,
  HiOutlineShoppingBag,
  HiCheckCircle,
  HiSparkles,
  HiTruck,
} from "react-icons/hi";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const NavbarComponent = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);

  const menuItems = [
    { to: "/", text: "Home", icon: HiHome },
    { to: "/shop", text: "Shop" },
    { to: "/categories", text: "Categories" },
    { to: "/about", text: "About" },
    { to: "/contact", text: "Contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 36) {
        // Height of announcement bar
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    // Add your search logic here
    console.log("Searching for:", searchQuery);
  };

  const handleLogoClick = () => {
    setIsMenuOpen(false);
    setIsSearchOpen(false);
    setIsCartOpen(false);
  };

  return (
    <>
      {/* Announcement Bar */}
      <div className="bg-black text-white overflow-hidden h-9">
        <div className="relative flex items-center h-full">
          <div className="animate-marquee whitespace-nowrap flex items-center absolute left-0">
            <span className="mx-4 flex items-center">
              <HiCheckCircle className="h-5 w-5 mr-2" />
              100% High Quality Material
            </span>
            <span className="mx-4 flex items-center">
              <HiSparkles className="h-5 w-5 mr-2" />
              New collection available now
            </span>
            <span className="mx-4 flex items-center">
              <HiTruck className="h-5 w-5 mr-2" />
              Fast delivery
            </span>
          </div>
          <div className="animate-marquee2 whitespace-nowrap flex items-center absolute left-0">
            <span className="mx-4 flex items-center">
              <HiCheckCircle className="h-5 w-5 mr-2" />
              100% High Quality Material
            </span>
            <span className="mx-4 flex items-center">
              <HiSparkles className="h-5 w-5 mr-2" />
              New collection available now
            </span>
            <span className="mx-4 flex items-center">
              <HiTruck className="h-5 w-5 mr-2" />
              Fast delivery
            </span>
          </div>
        </div>
      </div>

      {/* Fixed Navigation */}
      <header
        className={`fixed ${
          isScrolled ? "top-0" : "top-9"
        } left-0 right-0 w-full z-30 transition-all duration-300`}
      >
        <nav
          className={`w-full transition-all duration-300 ${
            isScrolled
              ? "bg-white/95 backdrop-blur-md shadow-md dark:bg-gray-900/95"
              : "bg-transparent border-b border-white/20"
          }`}
        >
          <div className="container mx-auto px-4 py-2 md:py-3">
            <div className="flex items-center justify-between">
              {/* Left Section */}
              <div className="w-1/3 flex items-center gap-8">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className={`relative z-50 p-2 lg:hidden rounded-lg transition-all duration-300 ${
                    isScrolled ? "text-gray-700" : "text-white"
                  }`}
                  aria-label="Toggle menu"
                >
                  <div className="flex flex-col justify-center w-6 h-6">
                    <span
                      className={`${
                        isScrolled ? "bg-gray-700" : "bg-white"
                      } block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${
                        isMenuOpen
                          ? "rotate-45 translate-y-1"
                          : "-translate-y-0.5"
                      }`}
                    ></span>
                    <span
                      className={`${
                        isScrolled ? "bg-gray-700" : "bg-white"
                      } block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-0.5 ${
                        isMenuOpen ? "opacity-0" : "opacity-100"
                      }`}
                    ></span>
                    <span
                      className={`${
                        isScrolled ? "bg-gray-700" : "bg-white"
                      } block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${
                        isMenuOpen
                          ? "-rotate-45 -translate-y-1"
                          : "translate-y-0.5"
                      }`}
                    ></span>
                  </div>
                </button>
                {/* Desktop Navigation */}
                <div className="hidden lg:flex items-center gap-6">
                  {menuItems.map((item) => (
                    <Link
                      key={item.to}
                      to={item.to}
                      className={`font-medium whitespace-nowrap transition-colors duration-200 ${
                        isScrolled
                          ? "text-gray-700 dark:text-gray-200 hover:text-dun"
                          : "text-white hover:text-white/80"
                      }`}
                    >
                      {item.text}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Center Section - Logo */}
              <div className="w-1/3 flex justify-center">
                <Link to="/" className="block" onClick={handleLogoClick}>
                  <img
                    src="/logo_idea_2-removebg-preview.png"
                    className="h-36 md:h-28 transition-transform duration-200 hover:scale-105"
                    alt="Onyi Trims Logo"
                  />
                </Link>
              </div>

              {/* Right Section */}
              <div className="w-1/3 flex items-center justify-end gap-6 md:gap-8">
                <Link
                  to="/login"
                  className={`hidden lg:block text-base font-medium transition-colors duration-200 ${
                    isScrolled
                      ? "text-gray-700 dark:text-gray-200 hover:text-dun"
                      : "text-white hover:text-white/80"
                  }`}
                >
                  Login
                </Link>

                <button
                  onClick={() => setIsSearchOpen(true)}
                  className={`p-2 transition-colors duration-200 ${
                    isScrolled
                      ? "text-gray-700 hover:text-dun"
                      : "text-white hover:text-white/80"
                  }`}
                  aria-label="Open search"
                >
                  <HiSearch className="h-7 w-7 md:h-8 md:w-8" />
                </button>

                <div className="relative inline-flex items-center">
                  <button
                    onClick={() => setIsCartOpen(true)}
                    className={`p-2 transition-colors duration-200 ${
                      isScrolled
                        ? "text-gray-700 hover:text-dun"
                        : "text-white hover:text-white/80"
                    }`}
                    aria-label="Open cart"
                  >
                    <HiShoppingCart className="h-7 w-7 md:h-8 md:w-8" />
                  </button>
                  <span className="absolute -right-0.5 -top-0.5 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-dun rounded-full border-2 border-white dark:border-gray-900">
                    0
                  </span>
                </div>
              </div>
            </div>
          </div>
        </nav>

        {/* Search Drawer */}
        <div
          className={`fixed inset-y-0 right-0 w-full md:w-[60%] bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${
            isSearchOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex flex-col h-full">
            {/* Close Button */}
            <div className="absolute top-4 right-4">
              <button
                onClick={() => setIsSearchOpen(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200"
                aria-label="Close search"
              >
                <HiX className="h-6 w-6 text-gray-500 dark:text-gray-400" />
              </button>
            </div>

            {/* Search Form */}
            <div className="p-6 pt-20">
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="w-full p-4 pl-12 text-lg border rounded-lg focus:outline-none focus:ring-2 focus:ring-dun focus:border-dun dark:bg-gray-800/50 dark:border-gray-700 dark:text-white transition-all duration-200"
                  autoFocus
                />
                <HiSearch className="absolute left-4 top-5 h-6 w-6 text-gray-500 dark:text-gray-400" />
              </form>
            </div>

            {/* Search Results */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {/* Add your search results here */}
            </div>

            {/* View All Results Button */}
            {searchQuery && (
              <div className="p-6 border-t dark:border-gray-700/50">
                <button
                  onClick={handleSearch}
                  className="w-full py-3 px-4 bg-dun hover:bg-dun/90 text-white font-medium rounded-lg transition-colors duration-200"
                >
                  View All Results
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Overlay for Search Drawer */}
        {isSearchOpen && (
          <div
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 transition-opacity duration-300"
            onClick={() => setIsSearchOpen(false)}
          ></div>
        )}

        {/* Cart Drawer */}
        <div
          className={`fixed inset-y-0 right-0 w-full md:w-[60%] bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${
            isCartOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex flex-col h-full">
            {/* Cart Header */}
            <div className="flex items-center justify-between p-6 border-b dark:border-gray-700/50">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                Cart
              </h2>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200"
                aria-label="Close cart"
              >
                <HiX className="h-6 w-6 text-gray-500 dark:text-gray-400" />
              </button>
            </div>

            {/* Empty Cart State */}
            <div className="flex-1 flex flex-col items-center justify-center p-6">
              <div className="bg-gray-100 dark:bg-gray-800 rounded-full p-6 mb-6">
                <HiOutlineShoppingBag className="h-16 w-16 text-gray-400 dark:text-gray-500" />
              </div>
              <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-3">
                Your cart is empty
              </h3>
              <p className="text-gray-500 dark:text-gray-400 text-center mb-8">
                Looks like you haven't added any items to your cart yet
              </p>
              <Link
                to="/shop"
                onClick={() => setIsCartOpen(false)}
                className="inline-flex items-center px-6 py-3 bg-dun hover:bg-dun/90 text-white font-medium rounded-lg transition-colors duration-200"
              >
                Start Shopping
              </Link>
            </div>
          </div>
        </div>

        {/* Overlay for Cart Drawer */}
        {isCartOpen && (
          <div
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 transition-opacity duration-300"
            onClick={() => setIsCartOpen(false)}
          ></div>
        )}

        {/* Mobile Menu */}
        <div
          className={`lg:hidden fixed inset-x-0 top-[9.25rem] bottom-0 bg-white dark:bg-gray-900 z-40 transition-all duration-500 ease-in-out transform ${
            isMenuOpen
              ? "translate-x-0 opacity-100"
              : "translate-x-full opacity-0"
          }`}
        >
          <div className="container mx-auto px-6 py-8">
            <div className="flex flex-col space-y-8">
              {/* Navigation Links */}
              <nav className="flex flex-col space-y-6">
                {menuItems.map((link, index) => (
                  <div
                    key={link.to}
                    className={`transform transition-all duration-300 delay-${
                      index * 100
                    } ${
                      isMenuOpen
                        ? "translate-x-0 opacity-100"
                        : "translate-x-8 opacity-0"
                    }`}
                  >
                    <Link
                      to={link.to}
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center text-2xl font-medium text-gray-900 dark:text-white hover:text-dun transition-colors duration-200"
                    >
                      {link.icon && <link.icon className="h-7 w-7 mr-3" />}
                      {link.text}
                    </Link>
                  </div>
                ))}
              </nav>

              {/* Search Bar */}
              <div
                className={`relative transform transition-all duration-300 delay-500 ${
                  isMenuOpen
                    ? "translate-x-0 opacity-100"
                    : "translate-x-8 opacity-0"
                }`}
              >
                <input
                  type="search"
                  className="w-full p-4 pl-12 text-lg border rounded-lg focus:outline-none focus:ring-2 focus:ring-dun focus:border-dun dark:bg-gray-800 dark:border-gray-700 dark:text-white transition-all duration-200"
                  placeholder="Search products..."
                />
                <HiSearch className="absolute left-4 top-5 h-6 w-6 text-gray-500 dark:text-gray-400" />
              </div>

              {/* Login Link */}
              <div
                className={`pt-4 border-t border-gray-200 dark:border-gray-700 transform transition-all duration-300 delay-600 ${
                  isMenuOpen
                    ? "translate-x-0 opacity-100"
                    : "translate-x-8 opacity-0"
                }`}
              >
                <Link
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center space-x-3 text-base text-gray-600 dark:text-gray-400 hover:text-dun transition-colors duration-200"
                >
                  <HiUser className="h-5 w-5" />
                  <span>Sign in to your account</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default NavbarComponent;
