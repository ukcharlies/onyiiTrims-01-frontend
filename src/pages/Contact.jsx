import React, { useState, useEffect } from "react";
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
import { useForm } from "react-hook-form";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";

const Contact = () => {
  const { darkMode } = useGlobal();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      fullname: "",
      email: "",
      subject: "",
      message: "",
      privacyPolicy: false,
    },
  });

  const [submitStatus, setSubmitStatus] = useState(null);

  useEffect(() => {
    // Initialize EmailJS with your public key
    emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);
  }, []);

  // Email submission handler
  const onSubmit = async (data) => {
    try {
      setSubmitStatus(null);

      // Send email to customer using business template
      const templateParams = {
        to_name: data.fullname,
        to_email: data.email,
        from_name: "Onyi Trims Team",
        subject: "Thank you for contacting Onyi Trims 💌",
        message: data.message,
      };

      const result = await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID_BUSINESS,
        templateParams
      );

      if (result.status === 200) {
        setSubmitStatus("success");
        toast.success(
          "Message sent successfully! Please check your email for confirmation."
        );
        reset();
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      console.error("Email error:", error);
      setSubmitStatus("error");
      toast.error("Failed to send message. Please try again.");
    }
  };

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
                      href="mailto:onyiitrims@gmail.com"
                      className={`${
                        darkMode ? "text-[#607466]" : "text-dun"
                      } hover:underline`}
                    >
                      onyiitrims@gmail.com
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
                      href="tel:08110462137"
                      className={`${
                        darkMode ? "text-[#607466]" : "text-dun"
                      } hover:underline`}
                    >
                      081 104-62137
                    </a>
                    <p
                      className={`${
                        darkMode ? "text-gray-300" : "text-gray-700"
                      } mb-1 mt-3`}
                    >
                      Customer Service:
                    </p>
                    <a
                      href="tel:+2347063165518"
                      className={`${
                        darkMode ? "text-[#607466]" : "text-dun"
                      } hover:underline`}
                    >
                      +234 706 316 5518
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
                      30 Araromi Street,
                      <br />
                      Shop 456
                      <br />
                      Oshodi,
                      <br />
                      Lagos States
                    </p>
                    <a
                      href="https://www.google.com/maps?q=6.557432451341992, 3.3493876878000566" // Replace with actual coordinates
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
                      <p>8:00 AM - 6:00 PM</p>
                      <p>Saturday:</p>
                      <p>10:00 AM - 6:00 PM</p>
                      <p>Sunday:</p>
                      <p>Online services only</p>
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
                  src="/images/shop-location.jpg"
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
                <iframe
                  title="Onyi Trims Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.7493957071765!2d3.3493856830511404!3d6.55744041787657!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMzMnMjYuOCJOIDPCsDIwJzU3LjgiRQ!5e0!3m2!1sen!2sng!4v1624987654321!5m2!1sen!2sng"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
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
                We currently offer four delivery options within Nigeria:
              </p>
              <ul
                className={`mt-2 list-disc pl-5 ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                <li>
                  <strong>Standard Delivery</strong> – Free for orders over
                  ₦20,000. Delivery within 1–7 business days.
                </li>
                <li>
                  <strong>Express Delivery</strong> – Arrives in 1–2 business
                  days if your order is placed before 12 PM. Fast, reliable, and
                  perfect for urgent needs.
                </li>
                <li>
                  <strong>Regular Delivery</strong> – Costs ₦1,000 with an
                  estimated delivery time of 1–7 business days.
                </li>
                <li>
                  <strong>Store Pickup</strong> – Available the next day from
                  our shop. It’s free and convenient if you’re nearby.
                </li>
              </ul>
              <p
                className={`mt-3 ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                All orders are processed promptly, and you'll receive tracking
                details once your order ships.
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
                logging into your account and visiting the Dashboard. section.
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
                We accept returns within <strong>7 days</strong> of delivery for
                unused items in their original packaging and condition. Custom
                orders and sale items may be final sale and not eligible for
                return. Please contact us with your order details to begin the
                return process or for more specific information.
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
                Yes, we proudly offer wholesale pricing for tailors, designers,
                fashion houses, and businesses looking to purchase in bulk. It's
                a great way to save on supplies while ensuring consistent
                quality. For pricing details, minimum order requirements, and
                how to become a wholesale partner, please contact our sales team
                at{" "}
                <a
                  href="mailto:onyiitrims@gmail.com"
                  className="underline text-blue-500"
                >
                  onyiitrims@gmail.com
                </a>
                .
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

          {submitStatus === "success" && (
            <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-md">
              Thank you for your message! We'll get back to you soon.
            </div>
          )}

          {submitStatus === "error" && (
            <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-md">
              Sorry, there was an error sending your message. Please try again.
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
                  className={`w-full px-4 py-3 rounded-md border ${
                    errors.fullname ? "border-red-500" : ""
                  } ${
                    darkMode
                      ? "bg-gray-700 border-gray-600 text-white"
                      : "bg-white border-gray-300"
                  }`}
                  {...register("fullname", {
                    required: "Full name is required",
                    minLength: {
                      value: 2,
                      message: "Name must be at least 2 characters",
                    },
                  })}
                />
                {errors.fullname && (
                  <p className="mt-1 text-red-500 text-sm">
                    {errors.fullname.message}
                  </p>
                )}
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
                  className={`w-full px-4 py-3 rounded-md border ${
                    errors.email ? "border-red-500" : ""
                  } ${
                    darkMode
                      ? "bg-gray-700 border-gray-600 text-white"
                      : "bg-white border-gray-300"
                  }`}
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                />
                {errors.email && (
                  <p className="mt-1 text-red-500 text-sm">
                    {errors.email.message}
                  </p>
                )}
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
                className={`w-full px-4 py-3 rounded-md border ${
                  darkMode
                    ? "bg-gray-700 border-gray-600 text-white"
                    : "bg-white border-gray-300"
                }`}
                {...register("subject")}
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
                rows="6"
                className={`w-full px-4 py-3 rounded-md border ${
                  errors.message ? "border-red-500" : ""
                } ${
                  darkMode
                    ? "bg-gray-700 border-gray-600 text-white"
                    : "bg-white border-gray-300"
                }`}
                {...register("message", {
                  required: "Message is required",
                  minLength: {
                    value: 10,
                    message: "Message must be at least 10 characters",
                  },
                })}
              ></textarea>
              {errors.message && (
                <p className="mt-1 text-red-500 text-sm">
                  {errors.message.message}
                </p>
              )}
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="privacyPolicy"
                className="mr-2"
                {...register("privacyPolicy", {
                  required: "You must agree to the Privacy Policy",
                })}
              />
              <label
                htmlFor="privacyPolicy"
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
              {errors.privacyPolicy && (
                <p className="ml-2 text-red-500 text-sm">
                  {errors.privacyPolicy.message}
                </p>
              )}
            </div>

            <div className="text-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`inline-block ${
                  darkMode ? "bg-[#607466]" : "bg-dun"
                } hover:opacity-90 text-white px-8 py-3 rounded-md font-medium transition-colors duration-300 ${
                  isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isSubmitting ? "Sending..." : "Submit Message"}
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Contact;
