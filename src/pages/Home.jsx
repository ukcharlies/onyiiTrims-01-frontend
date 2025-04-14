import React, { useEffect, useState } from "react";
import ProductSlider from "../components/ProductSlider";
import ProductGrid from "../components/ProductGrid";
import TestimonialCarousel from "../components/TestimonialCarousel";
import { toast } from "react-toastify";
import emailjs from "@emailjs/browser";
import { getHotBuyProducts, getFeaturedProducts } from "../services/api";

const Home = () => {
  const [hotBuyProducts, setHotBuyProducts] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState({
    hotBuy: true,
    featured: true,
  });
  const [error, setError] = useState({
    hotBuy: null,
    featured: null,
  });
  const [email, setEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);

  useEffect(() => {
    emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);
  }, []);

  useEffect(() => {
    const fetchHotBuyProducts = async () => {
      try {
        const data = await getHotBuyProducts();
        setHotBuyProducts(data);
        setError((prev) => ({ ...prev, hotBuy: null }));
      } catch (error) {
        console.error("Error fetching hot buy products:", error);
        setError((prev) => ({
          ...prev,
          hotBuy: "Unable to load hot buy products. Please try again later.",
        }));
        setHotBuyProducts([]);
      } finally {
        setLoading((prev) => ({ ...prev, hotBuy: false }));
      }
    };

    const fetchFeaturedProducts = async () => {
      try {
        const data = await getFeaturedProducts();
        setFeaturedProducts(data);
        setError((prev) => ({ ...prev, featured: null }));
      } catch (error) {
        console.error("Error fetching featured products:", error);
        setError((prev) => ({
          ...prev,
          featured: "Unable to load featured products. Please try again later.",
        }));
        setFeaturedProducts([]);
      } finally {
        setLoading((prev) => ({ ...prev, featured: false }));
      }
    };

    fetchHotBuyProducts();
    fetchFeaturedProducts();
  }, []);

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    setIsSubscribing(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/newsletter/subscribe`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to subscribe");
      }

      toast.success("Successfully subscribed to our newsletter!");
      setEmail("");
    } catch (error) {
      console.error("Newsletter subscription error:", error);
      toast.error(
        error.message || "Failed to subscribe. Please try again later."
      );
    } finally {
      setIsSubscribing(false);
    }
  };

  return (
    <main>
      {/* Hero Video Section */}
      <div className="relative w-full h-screen">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/homeVid.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Optional Overlay */}
        <div className="absolute inset-0 bg-black/30">
          <div className="container mx-auto px-4 h-full flex items-center justify-center">
            <div className="text-center text-white mt-20">
              <h1 className="font-playfair text-4xl md:text-6xl font-bold mb-4 tracking-tight">
                Welcome to Onyi Trims
              </h1>
              <p className="font-lora text-xl md:text-2xl mb-8 tracking-wide">
                Discover our exclusive collection
              </p>
              <button className="btn-fill">Shop Now</button>
            </div>
          </div>
        </div>
      </div>

      {/* Hot Buy Products Section */}
      <div className="relative bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 py-10">
          {loading.hotBuy ? (
            <div className="flex justify-center items-center py-10">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : error.hotBuy ? (
            <div className="text-center py-10">
              <p className="text-red-500">{error.hotBuy}</p>
              <p className="mt-2">
                Check if your backend server is running correctly.
              </p>
            </div>
          ) : hotBuyProducts.length === 0 ? (
            <div className="text-center py-10">
              <h2 className="font-playfair text-3xl font-bold mb-4">
                Hot Buys
              </h2>

              <p>No hot buy products available at the moment.</p>
            </div>
          ) : (
            <div>
              <ProductSlider
                products={hotBuyProducts}
                title="Hot Buys"
                description="Discover premium embellishments and fashion essentials handpicked for designers, tailors, and creatives. Explore our hottest buys collection."
              />
            </div>
          )}
        </div>
      </div>

      {/* Marquee Text Section */}
      <div className="bg-white dark:bg-gray-900 py-12 overflow-hidden border-y-2 border-dun dark:border-[#607466]">
        <div className="relative flex items-center h-20">
          <div className="animate-marquee whitespace-nowrap absolute left-0">
            <span className="mx-8 text-3xl md:text-4xl lg:text-5xl font-bold tracking-wider text-black dark:text-white border-b-2 border-dun dark:border-[#607466]">
              ELEVATED CRAFTSMANSHIP
            </span>
            <span className="mx-8 text-3xl md:text-4xl lg:text-5xl text-dun dark:text-[#607466]">
              ★
            </span>
            <span className="mx-8 text-3xl md:text-4xl lg:text-5xl font-bold tracking-wider text-black dark:text-white border-b-2 border-dun dark:border-[#607466]">
              EXQUISITE TRIM DETAILS
            </span>
            <span className="mx-8 text-3xl md:text-4xl lg:text-5xl text-dun dark:text-[#607466]">
              ★
            </span>
            <span className="mx-8 text-3xl md:text-4xl lg:text-5xl font-bold tracking-wider text-black dark:text-white border-b-2 border-dun dark:border-[#607466]">
              ELEVATED CRAFTSMANSHIP
            </span>
            <span className="mx-8 text-3xl md:text-4xl lg:text-5xl text-dun dark:text-[#607466]">
              ★
            </span>
            <span className="mx-8 text-3xl md:text-4xl lg:text-5xl font-bold tracking-wider text-black dark:text-white border-b-2 border-dun dark:border-[#607466]">
              EXQUISITE TRIM DETAILS
            </span>
            <span className="mx-8 text-3xl md:text-4xl lg:text-5xl text-dun dark:text-[#607466]">
              ★
            </span>
          </div>
          <div className="animate-marquee2 whitespace-nowrap absolute left-0">
            <span className="mx-8 text-3xl md:text-4xl lg:text-5xl font-bold tracking-wider text-black border-b-2 border-dun">
              ELEVATED CRAFTSMANSHIP
            </span>
            <span className="mx-8 text-3xl md:text-4xl lg:text-5xl text-dun">
              ★
            </span>
            <span className="mx-8 text-3xl md:text-4xl lg:text-5xl font-bold tracking-wider text-black border-b-2 border-dun">
              EXQUISITE TRIM DETAILS
            </span>
            <span className="mx-8 text-3xl md:text-4xl lg:text-5xl text-dun">
              ★
            </span>
            <span className="mx-8 text-3xl md:text-4xl lg:text-5xl font-bold tracking-wider text-black border-b-2 border-dun">
              ELEVATED CRAFTSMANSHIP
            </span>
            <span className="mx-8 text-3xl md:text-4xl lg:text-5xl text-dun">
              ★
            </span>
            <span className="mx-8 text-3xl md:text-4xl lg:text-5xl font-bold tracking-wider text-black border-b-2 border-dun">
              EXQUISITE TRIM DETAILS
            </span>
            <span className="mx-8 text-3xl md:text-4xl lg:text-5xl text-dun">
              ★
            </span>
          </div>
        </div>
      </div>

      {/* Promotional Features Section */}
      <div className="bg-white dark:bg-gray-900 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-playfair text-3xl font-bold mb-4 dark:text-white">
              Why Choose Onyi Trims
            </h2>
            <div className="w-24 h-1 bg-dun dark:bg-[#607466] mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              We provide premium quality trims and exceptional service to
              elevate your creative projects
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="flex flex-col items-center text-center p-6 bg-gray-50 dark:bg-[#343E3D] rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="w-16 h-16 bg-dun/10 dark:bg-[#607466]/20 rounded-full flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-8 h-8 text-dun dark:text-[#607466]"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 dark:text-white">
                Premium Quality
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Carefully curated collection of high-quality trims and
                embellishments sourced from the finest materials.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="flex flex-col items-center text-center p-6 bg-gray-50 dark:bg-[#343E3D] rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="w-16 h-16 bg-dun/10 dark:bg-[#607466]/20 rounded-full flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-8 h-8 text-dun dark:text-[#607466]"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 dark:text-white">
                Fast Shipping
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Quick and reliable delivery services to ensure your creative
                projects stay on schedule.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="flex flex-col items-center text-center p-6 bg-gray-50 dark:bg-[#343E3D] rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="w-16 h-16 bg-dun/10 dark:bg-[#607466]/20 rounded-full flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-8 h-8 text-dun dark:text-[#607466]"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 dark:text-white">
                Expert Support
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Our team of experts is always ready to assist you in finding the
                perfect trims for your projects.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Collections Section */}
      <div className="relative bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4 py-10">
          {loading.featured ? (
            <div className="flex justify-center items-center py-10">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 dark:border-[#607466]"></div>
            </div>
          ) : error.featured ? (
            <div className="text-center py-10">
              <p className="text-red-500 dark:text-red-400">{error.featured}</p>
              <p className="mt-2 dark:text-gray-300">
                Check if your backend server is running correctly.
              </p>
            </div>
          ) : featuredProducts.length === 0 ? (
            <div className="text-center py-10">
              <h2 className="font-playfair text-3xl font-bold mb-4 dark:text-white">
                Featured Collections
              </h2>
              <p className="dark:text-gray-300">
                No featured products available at the moment.
              </p>
            </div>
          ) : (
            <ProductGrid
              products={featuredProducts}
              title="Featured Collections"
              description="Explore our newest additions crafted with meticulous attention to detail. These premium trims and embellishments are selected to elevate your creative projects."
            />
          )}
        </div>
      </div>

      {/* Customer Reviews Section */}
      <div className="relative bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800">
        <div className="container mx-auto">
          <TestimonialCarousel />
        </div>
      </div>

      {/* Instagram Gallery Section */}

      {/* Newsletter Subscription Section */}
      <div className="py-20 bg-dun dark:bg-[#607466]">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-playfair text-3xl font-bold mb-4 text-white">
              Stay Inspired
            </h2>
            <p className="text-white/80 mb-8 text-lg">
              Subscribe to our newsletter and be the first to know about new
              collections, special offers, and creative inspiration.
            </p>

            <form
              onSubmit={handleNewsletterSubmit}
              className="flex flex-col md:flex-row gap-4 max-w-xl mx-auto"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="flex-grow px-6 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-white/50 dark:bg-gray-700 dark:text-white dark:placeholder-gray-300"
                required
                disabled={isSubscribing}
              />
              <button
                type="submit"
                disabled={isSubscribing}
                className="px-6 py-3 bg-white dark:bg-[#343E3D] text-dun dark:text-white font-medium rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubscribing ? "Subscribing..." : "Subscribe"}
              </button>
            </form>

            <p className="text-white/60 mt-4 text-sm">
              By subscribing, you agree to our Privacy Policy and consent to
              receive updates from our company.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
