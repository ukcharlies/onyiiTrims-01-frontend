import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useGlobal } from "../context/GlobalContext";
import { useCart } from "../context/CartContext";
import { searchProducts } from "../services/api";
import {
  HiOutlineShoppingBag,
  HiOutlineMenu,
  HiX,
  HiSearch,
  HiUser,
  HiLogout,
  HiOutlineCollection,
  HiShoppingBag,
  HiHome,
  HiCheckCircle,
  HiSparkles,
  HiTruck,
} from "react-icons/hi";
import CartDrawer from "./CartDrawer";
import ProductCard from "./ProductCard";

const NavbarComponent = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { cartItems } = useCart();
  const { isAuthenticated, user, logout, darkMode } = useGlobal();
  const location = useLocation();
  const navigate = useNavigate();
  const searchTimeoutRef = useRef(null);

  // Pages that should always have the colored navbar
  const coloredNavPages = [
    "/dashboard",
    "/profile",
    "/contact",
    "/about",
    "/categories",
    "/subcategories",
    "/orders",
    "/checkout",
    "/products",
    "/shop",
    "/order",
    "/admin",
    "/refund-policy",
    "/shipping-policy",
    "/privacy-policy",
    "/terms-of-service",
    "/faq",
  ];
  const shouldAlwaysBeColored = coloredNavPages.some((page) =>
    location.pathname.startsWith(page)
  );

  const cartItemCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const menuItems = [
    { to: "/", text: "Home", icon: HiHome },
    { to: "/shop", text: "Shop" },
    { to: "/categories", text: "Categories" },
    { to: "/about", text: "About" },
    { to: "/contact", text: "Contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 36 || shouldAlwaysBeColored) {
        // Height of announcement bar
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    // Initial call to set correct state based on current page
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname, shouldAlwaysBeColored]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    try {
      setIsSearching(true);
      const results = await searchProducts(searchQuery);
      setSearchResults(results);
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleSearchInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    // Clear previous timeout
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    // Set new timeout for debounced search
    if (query.trim()) {
      searchTimeoutRef.current = setTimeout(async () => {
        try {
          setIsSearching(true);
          const results = await searchProducts(query);
          setSearchResults(results);
        } catch (error) {
          console.error("Search error:", error);
        } finally {
          setIsSearching(false);
        }
      }, 300); // 300ms delay
    } else {
      setSearchResults([]);
    }
  };

  const handleLogoClick = () => {
    setIsMenuOpen(false);
    setIsSearchOpen(false);
    setIsCartOpen(false);
  };

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
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
              ? "bg-white/95 backdrop-blur-md shadow-md dark:bg-gray-900/95 dark:text-white"
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
                      className={`font-lora font-medium tracking-wide whitespace-nowrap transition-colors duration-200 ${
                        isScrolled
                          ? "text-gray-700 dark:text-gray-200 hover:text-dun dark:hover:text-dun"
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
                {isAuthenticated ? (
                  <div className="hidden lg:flex items-center gap-4">
                    <Link
                      to="/dashboard"
                      className={`font-lora tracking-wide text-base font-medium transition-colors duration-200 ${
                        isScrolled
                          ? "text-gray-700 dark:text-gray-200 hover:text-dun dark:hover:text-dun"
                          : "text-white hover:text-white/80"
                      }`}
                    >
                      Dashboard
                    </Link>
                    <Link
                      to="/profile"
                      className={`flex items-center gap-1 font-lora tracking-wide text-base font-medium transition-colors duration-200 ${
                        isScrolled
                          ? "text-gray-700 dark:text-gray-200 hover:text-dun dark:hover:text-dun"
                          : "text-white hover:text-white/80"
                      }`}
                    >
                      <HiUser className="h-5 w-5" />
                      <span>{user?.firstName || "Profile"}</span>
                    </Link>
                  </div>
                ) : (
                  <Link
                    to="/login"
                    className={`hidden lg:flex items-center px-4 py-2 rounded ${
                      isScrolled
                        ? "bg-dun text-white hover:bg-dun/90"
                        : "bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm"
                    } transition-colors duration-200`}
                  >
                    <HiUser className="h-5 w-5 mr-2" />
                    <span className="font-medium">Login</span>
                  </Link>
                )}

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
                    className={`relative p-2 transition-colors duration-200 ${
                      isScrolled
                        ? "text-gray-700 hover:text-dun"
                        : "text-white hover:text-white/80"
                    }`}
                    aria-label="Open cart"
                  >
                    <HiOutlineShoppingBag className="h-7 w-7 md:h-8 md:w-8" />
                    {cartItems.length > 0 && (
                      <span className="absolute top-0 right-0 bg-dun text-white text-xs h-5 w-5 flex items-center justify-center rounded-full">
                        {cartItems.length}
                      </span>
                    )}
                  </button>
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
                  onChange={handleSearchInputChange}
                  placeholder="Search products..."
                  className="w-full p-4 pl-12 text-lg border rounded-lg focus:outline-none focus:ring-2 focus:ring-dun focus:border-dun dark:bg-gray-800/50 dark:border-gray-700 dark:text-white transition-all duration-200"
                  autoFocus
                />
                <HiSearch className="absolute left-4 top-5 h-6 w-6 text-gray-500 dark:text-gray-400" />
              </form>
            </div>

            {/* Search Results */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {isSearching ? (
                <div className="flex justify-center items-center h-32">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-dun"></div>
                </div>
              ) : searchResults.length > 0 ? (
                <div className="grid grid-cols-1 gap-4">
                  {searchResults.map((product) => (
                    <div
                      key={product.id}
                      className="transform transition duration-300 hover:translate-y-[-5px]"
                    >
                      <ProductCard product={product} />
                    </div>
                  ))}
                </div>
              ) : searchQuery.trim() ? (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  No products found matching your search.
                </div>
              ) : null}
            </div>

            {/* View All Results Button */}
            {searchQuery.trim() && (
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
        <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

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

              {/* Login/Register Links in Mobile Menu */}
              <div
                className={`pt-4 border-t border-gray-200 dark:border-gray-700 transform transition-all duration-300 delay-600 ${
                  isMenuOpen
                    ? "translate-x-0 opacity-100"
                    : "translate-x-8 opacity-0"
                }`}
              >
                {isAuthenticated ? (
                  <div className="flex flex-col space-y-4">
                    <div className="text-gray-600 mb-2">
                      Welcome, {user?.firstName || "User"}!
                    </div>
                    <Link
                      to="/dashboard"
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center space-x-3 text-base text-gray-600 dark:text-gray-400 hover:text-dun transition-colors duration-200"
                    >
                      <HiOutlineShoppingBag className="h-5 w-5" />
                      <span>Dashboard</span>
                    </Link>
                    <Link
                      to="/profile"
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center space-x-3 text-base text-gray-600 dark:text-gray-400 hover:text-dun transition-colors duration-200"
                    >
                      <HiUser className="h-5 w-5" />
                      <span>My Profile</span>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-3 text-base text-gray-600 dark:text-gray-400 hover:text-dun transition-colors duration-200"
                    >
                      <HiLogout className="h-5 w-5" />
                      <span>Logout</span>
                    </button>
                  </div>
                ) : (
                  <Link
                    to="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center space-x-3 text-base text-gray-600 dark:text-gray-400 hover:text-dun transition-colors duration-200"
                  >
                    <HiUser className="h-5 w-5" />
                    <span>Login</span>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default NavbarComponent;
