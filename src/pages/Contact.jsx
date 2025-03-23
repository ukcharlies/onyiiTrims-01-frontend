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

const Contact = () => {
  // Handler for image error
  const handleImageError = (e) => {
    // Use a local fallback image instead of an external placeholder
    e.target.src = "/images/placeholder-image.jpg";
  };

  return (
    <div className="pt-36 md:pt-40">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-dun/10 to-dun/5 py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold font-lora mb-6">
              Contact Us
            </h1>
            <p className="text-lg text-gray-700 mb-8">
              We'd love to hear from you. Get in touch with our team for any
              questions, collaborations, or assistance with your orders.
            </p>
          </div>
        </div>
      </div>

      {/* Contact Information Grid */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            {/* Left Column - Contact Details */}
            <div>
              <h2 className="text-3xl font-bold font-lora mb-8">
                Get In Touch
              </h2>

              <div className="space-y-8">
                <div className="flex items-start">
                  <div className="bg-dun/10 p-3 rounded-full mr-4">
                    <HiMail className="h-6 w-6 text-dun" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold font-lora mb-2">
                      Email Us
                    </h3>
                    <p className="text-gray-700 mb-1">General Inquiries:</p>
                    <a
                      href="mailto:info@onyitrims.com"
                      className="text-dun hover:underline"
                    >
                      info@onyitrims.com
                    </a>
                    <p className="text-gray-700 mb-1 mt-3">Customer Support:</p>
                    <a
                      href="mailto:support@onyitrims.com"
                      className="text-dun hover:underline"
                    >
                      support@onyitrims.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-dun/10 p-3 rounded-full mr-4">
                    <HiPhone className="h-6 w-6 text-dun" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold font-lora mb-2">
                      Call Us
                    </h3>
                    <p className="text-gray-700 mb-1">Main Office:</p>
                    <a
                      href="tel:+12345678900"
                      className="text-dun hover:underline"
                    >
                      +1 (234) 567-8900
                    </a>
                    <p className="text-gray-700 mb-1 mt-3">Customer Service:</p>
                    <a
                      href="tel:+12345678901"
                      className="text-dun hover:underline"
                    >
                      +1 (234) 567-8901
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-dun/10 p-3 rounded-full mr-4">
                    <HiLocationMarker className="h-6 w-6 text-dun" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold font-lora mb-2">
                      Visit Us
                    </h3>
                    <p className="text-gray-700 mb-3">
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
                      className="inline-flex items-center text-dun hover:underline"
                    >
                      View on Map <HiArrowRight className="ml-1" />
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-dun/10 p-3 rounded-full mr-4">
                    <HiClock className="h-6 w-6 text-dun" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold font-lora mb-2">
                      Store Hours
                    </h3>
                    <div className="grid grid-cols-2 gap-x-4 text-gray-700">
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
                <h3 className="text-xl font-bold font-lora mb-4">Follow Us</h3>
                <div className="flex space-x-4">
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-dun/10 p-3 rounded-full text-dun hover:bg-dun hover:text-white transition-colors duration-300"
                  >
                    <FaInstagram className="h-5 w-5" />
                  </a>
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-dun/10 p-3 rounded-full text-dun hover:bg-dun hover:text-white transition-colors duration-300"
                  >
                    <FaFacebook className="h-5 w-5" />
                  </a>
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-dun/10 p-3 rounded-full text-dun hover:bg-dun hover:text-white transition-colors duration-300"
                  >
                    <FaTwitter className="h-5 w-5" />
                  </a>
                  <a
                    href="https://pinterest.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-dun/10 p-3 rounded-full text-dun hover:bg-dun hover:text-white transition-colors duration-300"
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

              <div className="rounded-lg overflow-hidden shadow-lg h-80">
                {/* Replace with actual Google Maps embed */}
                <div className="bg-gray-200 w-full h-full flex items-center justify-center">
                  <p className="text-gray-500">Map Location</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl font-bold font-lora text-center mb-12">
            Frequently Asked Questions
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold font-lora mb-3">
                What are your shipping options?
              </h3>
              <p className="text-gray-700">
                We offer standard shipping (5-7 business days), express shipping
                (2-3 business days), and next-day delivery options. Shipping
                costs are calculated at checkout based on your location and
                selected method.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold font-lora mb-3">
                How can I track my order?
              </h3>
              <p className="text-gray-700">
                Once your order ships, you'll receive a confirmation email with
                tracking information. You can also view your order status by
                logging into your account and visiting the order history
                section.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold font-lora mb-3">
                What is your return policy?
              </h3>
              <p className="text-gray-700">
                We accept returns within 30 days of delivery for unused items in
                their original packaging. Custom orders and sale items may have
                different return policies. Please contact our customer service
                for assistance.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold font-lora mb-3">
                Do you offer wholesale options?
              </h3>
              <p className="text-gray-700">
                Yes, we provide wholesale options for businesses. Please contact
                our sales team at wholesale@onyitrims.com to discuss your needs
                and receive our wholesale catalog and pricing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-dun/10">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-3xl font-bold font-lora mb-6">
            Ready to Transform Your Space?
          </h2>
          <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
            Browse our collection of premium fabrics and trims to elevate your
            next project.
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center bg-dun hover:bg-dun/90 text-white px-8 py-3 rounded-md font-medium transition-colors duration-300"
          >
            <HiOutlineShoppingBag className="mr-2 h-5 w-5" />
            Shop Our Collection
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Contact;
