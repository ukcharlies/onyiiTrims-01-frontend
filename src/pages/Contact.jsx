import React from "react";
import { Link } from "react-router-dom";
import {
  HiMail,
  HiPhone,
  HiLocationMarker,
  HiClock,
  HiArrowRight,
  HiOutlineShoppingBag,
} from "react-icons/hi";
import {
  FaInstagram,
  FaFacebook,
  FaTwitter,
  FaPinterest,
} from "react-icons/fa";
import { useGlobal } from "../context/GlobalContext";

const Contact = () => {
  const { darkMode } = useGlobal();

  // Handler for image error
  const handleImageError = (e) => {
    // Use a local fallback image instead of an external placeholder
    e.target.src = "/images/placeholder-image.jpg";
  };

  return (
    <div className="pt-36 md:pt-40">
      {/* Hero Section */}
      <div
        className={`${
          darkMode ? "bg-[#343E3D]" : "bg-gradient-to-r from-dun/10 to-dun/5"
        } py-16 md:py-24`}
      >
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center max-w-3xl mx-auto">
            <h1
              className={`text-4xl md:text-5xl font-bold font-lora mb-6 ${
                darkMode ? "text-white" : ""
              }`}
            >
              Contact Us
            </h1>
            <p
              className={`text-lg ${
                darkMode ? "text-gray-300" : "text-gray-700"
              } mb-8`}
            >
              We'd love to hear from you. Get in touch with our team for any
              questions, collaborations, or assistance with your orders.
            </p>
          </div>
        </div>
      </div>

      {/* Contact Information Grid */}
      <section className={`py-16 ${darkMode ? "bg-[#343E3D]" : "bg-white"}`}>
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            {/* Left Column - Contact Details */}
            <div>
              <h2
                className={`text-3xl font-bold font-lora mb-8 ${
                  darkMode ? "text-white" : ""
                }`}
              >
                Get In Touch
              </h2>

              <div className="space-y-8">
                <div className="flex items-start">
                  <div
                    className={`${
                      darkMode ? "bg-[#607466]/20" : "bg-dun/10"
                    } p-3 rounded-full mr-4`}
                  >
                    <HiMail
                      className={`h-6 w-6 ${
                        darkMode ? "text-[#607466]" : "text-dun"
                      }`}
                    />
                  </div>
                  <div>
                    <h3
                      className={`text-xl font-bold font-lora mb-2 ${
                        darkMode ? "text-white" : ""
                      }`}
                    >
                      Email Us
                    </h3>
                    <p
                      className={`${
                        darkMode ? "text-gray-300" : "text-gray-700"
                      } mb-1`}
                    >
                      General Inquiries:
                    </p>
                    <a
                      href="mailto:info@onyitrims.com"
                      className={`${
                        darkMode ? "text-[#607466]" : "text-dun"
                      } hover:underline`}
                    >
                      info@onyitrims.com
                    </a>
                    <p
                      className={`${
                        darkMode ? "text-gray-300" : "text-gray-700"
                      } mb-1 mt-3`}
                    >
                      Customer Support:
                    </p>
                    <a
                      href="mailto:support@onyitrims.com"
                      className={`${
                        darkMode ? "text-[#607466]" : "text-dun"
                      } hover:underline`}
                    >
                      support@onyitrims.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div
                    className={`${
                      darkMode ? "bg-[#607466]/20" : "bg-dun/10"
                    } p-3 rounded-full mr-4`}
                  >
                    <HiPhone
                      className={`h-6 w-6 ${
                        darkMode ? "text-[#607466]" : "text-dun"
                      }`}
                    />
                  </div>
                  <div>
                    <h3
                      className={`text-xl font-bold font-lora mb-2 ${
                        darkMode ? "text-white" : ""
                      }`}
                    >
                      Call Us
                    </h3>
                    <p
                      className={`${
                        darkMode ? "text-gray-300" : "text-gray-700"
                      } mb-1`}
                    >
                      Main Office:
                    </p>
                    <a
                      href="tel:+12345678900"
                      className={`${
                        darkMode ? "text-[#607466]" : "text-dun"
                      } hover:underline`}
                    >
                      +1 (234) 567-8900
                    </a>
                    <p
                      className={`${
                        darkMode ? "text-gray-300" : "text-gray-700"
                      } mb-1 mt-3`}
                    >
                      Customer Service:
                    </p>
                    <a
                      href="tel:+12345678901"
                      className={`${
                        darkMode ? "text-[#607466]" : "text-dun"
                      } hover:underline`}
                    >
                      +1 (234) 567-8901
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div
                    className={`${
                      darkMode ? "bg-[#607466]/20" : "bg-dun/10"
                    } p-3 rounded-full mr-4`}
                  >
                    <HiLocationMarker
                      className={`h-6 w-6 ${
                        darkMode ? "text-[#607466]" : "text-dun"
                      }`}
                    />
                  </div>
                  <div>
                    <h3
                      className={`text-xl font-bold font-lora mb-2 ${
                        darkMode ? "text-white" : ""
                      }`}
                    >
                      Visit Us
                    </h3>
                    <p
                      className={`${
                        darkMode ? "text-gray-300" : "text-gray-700"
                      } mb-3`}
                    >
                      123 Fashion Avenue
                      <br />
                      Suite 456
                      <br />
                      New York, NY 10001
                      <br />
                      United States
                    </p>
                    <a
                      href="https://maps.google.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center ${
                        darkMode ? "text-[#607466]" : "text-dun"
                      } hover:underline`}
                    >
                      View on Map <HiArrowRight className="ml-1" />
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div
                    className={`${
                      darkMode ? "bg-[#607466]/20" : "bg-dun/10"
                    } p-3 rounded-full mr-4`}
                  >
                    <HiClock
                      className={`h-6 w-6 ${
                        darkMode ? "text-[#607466]" : "text-dun"
                      }`}
                    />
                  </div>
                  <div>
                    <h3
                      className={`text-xl font-bold font-lora mb-2 ${
                        darkMode ? "text-white" : ""
                      }`}
                    >
                      Store Hours
                    </h3>
                    <div
                      className={`grid grid-cols-2 gap-x-4 ${
                        darkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      <p>Monday - Friday:</p>
                      <p>9:00 AM - 7:00 PM</p>
                      <p>Saturday:</p>
                      <p>10:00 AM - 6:00 PM</p>
                      <p>Sunday:</p>
                      <p>11:00 AM - 5:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-12">
                <h3
                  className={`text-xl font-bold font-lora mb-4 ${
                    darkMode ? "text-white" : ""
                  }`}
                >
                  Follow Us
                </h3>
                <div className="flex space-x-4">
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${
                      darkMode
                        ? "bg-[#607466]/20 text-[#607466] hover:bg-[#607466]"
                        : "bg-dun/10 text-dun hover:bg-dun"
                    } p-3 rounded-full hover:text-white transition-colors duration-300`}
                  >
                    <FaInstagram className="h-5 w-5" />
                  </a>
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${
                      darkMode
                        ? "bg-[#607466]/20 text-[#607466] hover:bg-[#607466]"
                        : "bg-dun/10 text-dun hover:bg-dun"
                    } p-3 rounded-full hover:text-white transition-colors duration-300`}
                  >
                    <FaFacebook className="h-5 w-5" />
                  </a>
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${
                      darkMode
                        ? "bg-[#607466]/20 text-[#607466] hover:bg-[#607466]"
                        : "bg-dun/10 text-dun hover:bg-dun"
                    } p-3 rounded-full hover:text-white transition-colors duration-300`}
                  >
                    <FaTwitter className="h-5 w-5" />
                  </a>
                  <a
                    href="https://pinterest.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${
                      darkMode
                        ? "bg-[#607466]/20 text-[#607466] hover:bg-[#607466]"
                        : "bg-dun/10 text-dun hover:bg-dun"
                    } p-3 rounded-full hover:text-white transition-colors duration-300`}
                  >
                    <FaPinterest className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column - Map and Image */}
            <div>
              <div className="rounded-lg overflow-hidden shadow-lg">
                <img
                  src="/images/store-location.jpg"
                  alt="Our Store"
                  className="w-full h-auto"
                  onError={handleImageError}
                />
              </div>

              <div
                className={`rounded-lg overflow-hidden shadow-lg h-80 mt-8 ${
                  darkMode ? "bg-gray-700" : "bg-gray-200"
                }`}
              >
                {/* Replace with actual Google Maps embed */}
                <div className="w-full h-full flex items-center justify-center">
                  <p
                    className={`${
                      darkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    Map Location
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className={`py-16 ${darkMode ? "bg-gray-800" : "bg-gray-50"}`}>
        <div className="container mx-auto px-4 max-w-6xl">
          <h2
            className={`text-3xl font-bold font-lora text-center mb-12 ${
              darkMode ? "text-white" : ""
            }`}
          >
            Frequently Asked Questions
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div
              className={`${
                darkMode ? "bg-[#343E3D]" : "bg-white"
              } p-6 rounded-lg shadow-md`}
            >
              <h3
                className={`text-xl font-bold font-lora mb-3 ${
                  darkMode ? "text-white" : ""
                }`}
              >
                What are your shipping options?
              </h3>
              <p className={`${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                We offer standard shipping (5-7 business days), express shipping
                (2-3 business days), and next-day delivery options. Shipping
                costs are calculated at checkout based on your location and
                selected method.
              </p>
            </div>

            <div
              className={`${
                darkMode ? "bg-[#343E3D]" : "bg-white"
              } p-6 rounded-lg shadow-md`}
            >
              <h3
                className={`text-xl font-bold font-lora mb-3 ${
                  darkMode ? "text-white" : ""
                }`}
              >
                How can I track my order?
              </h3>
              <p className={`${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                Once your order ships, you'll receive a confirmation email with
                tracking information. You can also view your order status by
                logging into your account and visiting the order history
                section.
              </p>
            </div>

            <div
              className={`${
                darkMode ? "bg-[#343E3D]" : "bg-white"
              } p-6 rounded-lg shadow-md`}
            >
              <h3
                className={`text-xl font-bold font-lora mb-3 ${
                  darkMode ? "text-white" : ""
                }`}
              >
                What is your return policy?
              </h3>
              <p className={`${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                We accept returns within 30 days of delivery for unused items in
                their original packaging. Custom orders and sale items may have
                different policies. Please contact us for specific details.
              </p>
            </div>

            <div
              className={`${
                darkMode ? "bg-[#343E3D]" : "bg-white"
              } p-6 rounded-lg shadow-md`}
            >
              <h3
                className={`text-xl font-bold font-lora mb-3 ${
                  darkMode ? "text-white" : ""
                }`}
              >
                Do you offer wholesale pricing?
              </h3>
              <p className={`${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                Yes, we provide wholesale options for businesses and designers.
                Please contact our sales team at wholesale@onyitrims.com for
                pricing information and minimum order requirements.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className={`py-16 ${darkMode ? "bg-[#343E3D]" : "bg-white"}`}>
        <div className="container mx-auto px-4 max-w-3xl">
          <h2
            className={`text-3xl font-bold font-lora text-center mb-12 ${
              darkMode ? "text-white" : ""
            }`}
          >
            Send Us a Message
          </h2>

          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="fullname"
                  className={`block mb-2 font-medium ${
                    darkMode ? "text-white" : ""
                  }`}
                >
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="fullname"
                  name="fullname"
                  className={`w-full px-4 py-3 rounded-md border ${
                    darkMode
                      ? "bg-gray-700 border-gray-600 text-white"
                      : "bg-white border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-dun focus:border-dun`}
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className={`block mb-2 font-medium ${
                    darkMode ? "text-white" : ""
                  }`}
                >
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className={`w-full px-4 py-3 rounded-md border ${
                    darkMode
                      ? "bg-gray-700 border-gray-600 text-white"
                      : "bg-white border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-dun focus:border-dun`}
                  required
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="subject"
                className={`block mb-2 font-medium ${
                  darkMode ? "text-white" : ""
                }`}
              >
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                className={`w-full px-4 py-3 rounded-md border ${
                  darkMode
                    ? "bg-gray-700 border-gray-600 text-white"
                    : "bg-white border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-dun focus:border-dun`}
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className={`block mb-2 font-medium ${
                  darkMode ? "text-white" : ""
                }`}
              >
                Message <span className="text-red-500">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                rows="6"
                className={`w-full px-4 py-3 rounded-md border ${
                  darkMode
                    ? "bg-gray-700 border-gray-600 text-white"
                    : "bg-white border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-dun focus:border-dun`}
                required
              ></textarea>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="privacy-policy"
                name="privacy-policy"
                className="mr-2"
                required
              />
              <label
                htmlFor="privacy-policy"
                className={`text-sm ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                I agree to the{" "}
          <Link
                  to="/privacy-policy"
                  className={`${
                    darkMode ? "text-[#607466]" : "text-dun"
                  } hover:underline`}
                >
                  Privacy Policy
          </Link>
              </label>
            </div>

            <div className="text-center">
              <button
                type="submit"
                className={`inline-block ${
                  darkMode ? "bg-[#607466]" : "bg-dun"
                } hover:opacity-90 text-white px-8 py-3 rounded-md font-medium transition-colors duration-300`}
              >
                Submit Message
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Contact;
