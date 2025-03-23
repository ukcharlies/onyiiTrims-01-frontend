import React, { useState } from "react";
import { Link } from "react-router-dom";
import { HiCheckCircle, HiSparkles, HiTruck } from "react-icons/hi";

const About = () => {
  // Track loading state for images
  const [imagesLoaded, setImagesLoaded] = useState({
    story: false,
    team1: false,
    team2: false,
    team3: false,
  });

  // Handler for successful image load
  const handleImageLoad = (imageName) => {
    setImagesLoaded((prev) => ({
      ...prev,
      [imageName]: true,
    }));
  };

  // Handler for image error
  const handleImageError = (e, imageName) => {
    // Use a local fallback image instead of an external placeholder
    e.target.src = "/images/placeholder-image.jpg";

    // Mark as loaded even though it's the fallback image
    if (imageName) {
      handleImageLoad(imageName);
    }
  };

  return (
    <div className="pt-36 md:pt-40">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-dun/10 to-dun/5 py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold font-lora mb-6">
              About Onyi Trims
            </h1>
            <p className="text-lg text-gray-700 mb-8">
              Crafting elegance through quality fabrics and impeccable design
              since 2022.
            </p>
          </div>
        </div>
      </div>

      {/* Our Story Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold font-lora mb-6">Our Story</h2>
              <p className="text-gray-700 mb-4">
                Onyii Trims was born from a deep passion for craftsmanship and a
                dream to make quality trimmings accessible to every tailor,
                designer, and creative mind. Our founder, Onyinyechi, started
                with a simple yet powerful belief: the smallest details can
                transform a piece of fabric into something extraordinary. What
                began as a humble collection of carefully selected trimmings has
                grown into a trusted source for premium-quality laces, buttons,
                threads, and finishing touches that breathe life into garments.
                Each piece we offer carries a story—of heritage, artistry, and a
                commitment to excellence.
              </p>
              <p className="text-gray-700 mb-4">
                At Onyii Trims, we don’t just sell materials; we provide the
                final touch that completes your vision. Whether you’re a tailor
                crafting bespoke designs, a retailer seeking the best for your
                customers, or a designer pushing creative boundaries, we are
                here to support your journey.
              </p>
              <p className="text-gray-700">
                As we grow, we remain rooted in our values—quality,
                authenticity, and innovation. Every stitch, every embellishment,
                and every detail matter to us, just as they matter to you.
                Together, let’s continue to create pieces that tell stories,
                inspire confidence, and celebrate beauty in every form.As we
                grow, we remain rooted in our values—quality, authenticity, and
                innovation. Every stitch, every embellishment, and every detail
                matter to us, just as they matter to you. Together, let’s
                continue to create pieces that tell stories, inspire confidence,
                and celebrate beauty in every form..
              </p>
            </div>
            <div className="rounded-lg overflow-hidden shadow-xl relative min-h-[300px] bg-gray-100">
              {/* Optional loading placeholder */}
              {!imagesLoaded.story && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full border-2 border-dun border-t-transparent animate-spin"></div>
                </div>
              )}
              <img
                src="/images/about-story.jpg"
                alt="Fabric selection at Onyi Trims"
                className={`w-full h-auto object-cover ${
                  imagesLoaded.story ? "opacity-100" : "opacity-0"
                } transition-opacity duration-300`}
                data-imgname="story"
                onLoad={() => handleImageLoad("story")}
                onError={(e) => handleImageError(e, "story")}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl font-bold font-lora text-center mb-12">
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="bg-dun/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <HiCheckCircle className="h-8 w-8 text-dun" />
              </div>
              <h3 className="text-xl font-bold font-lora mb-3">Quality</h3>
              <p className="text-gray-700">
                We source only the finest materials, ensuring each product meets
                our rigorous standards for excellence in texture, durability,
                and design.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="bg-dun/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <HiSparkles className="h-8 w-8 text-dun" />
              </div>
              <h3 className="text-xl font-bold font-lora mb-3">
                Craftsmanship
              </h3>
              <p className="text-gray-700">
                We celebrate the art of creation, honoring traditional
                techniques while embracing modern innovation in every fabric we
                offer.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="bg-dun/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <HiTruck className="h-8 w-8 text-dun" />
              </div>
              <h3 className="text-xl font-bold font-lora mb-3">
                Sustainability
              </h3>
              <p className="text-gray-700">
                We're committed to responsible sourcing and ethical practices,
                minimizing our environmental impact while maximizing the beauty
                of our products.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl font-bold font-lora text-center mb-12">
            Meet Our Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-gray-200 w-48 h-48 rounded-full mx-auto mb-4 overflow-hidden relative">
                {!imagesLoaded.team1 && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full border-2 border-dun border-t-transparent animate-spin"></div>
                  </div>
                )}
                <img
                  src="/images/team-founder.jpg"
                  alt="Ukachi Onyinyechi"
                  className={`w-full h-full object-cover ${
                    imagesLoaded.team1 ? "opacity-100" : "opacity-0"
                  } transition-opacity duration-300`}
                  data-imgname="team1"
                  onLoad={() => handleImageLoad("team1")}
                  onError={(e) => handleImageError(e, "team1")}
                />
              </div>
              <h3 className="text-xl font-bold font-lora mb-1">
                Ukachi Onyinyechi
              </h3>
              <p className="text-dun mb-3">Founder & Operations Lead</p>
              <p className="text-gray-700 max-w-xs mx-auto">
                With over 15 years in textile design, Onyinyechi brings her
                passion for fabric and pattern to every aspect of Onyi Trims.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-gray-200 w-48 h-48 rounded-full mx-auto mb-4 overflow-hidden relative">
                {!imagesLoaded.team2 && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full border-2 border-dun border-t-transparent animate-spin"></div>
                  </div>
                )}
                <img
                  src="/images/team-design.jpg"
                  alt="6ix theDev"
                  className={`w-full h-full object-cover ${
                    imagesLoaded.team2 ? "opacity-100" : "opacity-0"
                  } transition-opacity duration-300`}
                  data-imgname="team2"
                  onLoad={() => handleImageLoad("team2")}
                  onError={(e) => handleImageError(e, "team2")}
                />
              </div>
              <h3 className="text-xl font-bold font-lora mb-1">6ix theDev</h3>
              <p className="text-dun mb-3">Technical & Customer Support Lead</p>
              <p className="text-gray-700 max-w-xs mx-auto">
                6ix is responsible for managing the Onyii Trims website and
                handling all technical aspects to ensure a seamless shopping
                experience. He also serves as the first point of contact for
                customer inquiries, resolving issues before escalating them when
                necessary.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-gray-200 w-48 h-48 rounded-full mx-auto mb-4 overflow-hidden relative">
                {!imagesLoaded.team3 && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full border-2 border-dun border-t-transparent animate-spin"></div>
                  </div>
                )}
                <img
                  src="/images/team-operations.jpg"
                  alt="Ukachi Augustine "
                  className={`w-full h-full object-cover ${
                    imagesLoaded.team3 ? "opacity-100" : "opacity-0"
                  } transition-opacity duration-300`}
                  data-imgname="team3"
                  onLoad={() => handleImageLoad("team3")}
                  onError={(e) => handleImageError(e, "team3")}
                />
              </div>
              <h3 className="text-xl font-bold font-lora mb-1">
                Ukachi Augustine{" "}
              </h3>
              <p className="text-dun mb-3">
                Finance, Logistics & Communications Manager
              </p>
              <p className="text-gray-700 max-w-xs mx-auto">
                Augustine manages financial transactions, customer emails, and
                shipping logistics. From processing payments to ensuring orders
                are packed and delivered on time, he keeps Onyii Trims running
                efficiently behind the scenes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-dun/10">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-3xl font-bold font-lora mb-6">
            Experience the Onyi Trims Difference
          </h2>
          <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
            Discover our collection of premium fabrics and elevate your next
            project with the quality and beauty that only Onyi Trims can
            deliver.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/categories"
              className="bg-dun hover:bg-dun/90 text-white px-8 py-3 rounded-md font-medium transition-colors duration-300"
            >
              Shop Now
            </Link>
            <Link
              to="/contact"
              className="bg-white hover:bg-gray-100 text-dun border border-dun px-8 py-3 rounded-md font-medium transition-colors duration-300"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
