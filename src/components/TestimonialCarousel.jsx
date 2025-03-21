import React, { useState, useEffect } from "react";

const testimonials = [
  {
    id: 1,
    content:
      "The ribbons I purchased from Onyi Trims elevated my wedding dress design beyond my expectations. The quality and attention to detail is exceptional!",
    author: "Sarah Johnson",
    position: "Fashion Designer",
    rating: 5,
    image: "https://randomuser.me/api/portraits/women/23.jpg",
  },
  {
    id: 2,
    content:
      "As a DIY enthusiast, I've ordered from many trim suppliers, but none match the quality and variety offered by Onyi Trims. Their buttons collection is simply outstanding.",
    author: "Michael Chen",
    position: "Craft Enthusiast",
    rating: 5,
    image: "https://randomuser.me/api/portraits/men/54.jpg",
  },
  {
    id: 3,
    content:
      "The silk ribbons I ordered arrived promptly and the colors were exactly as shown online. My clients were impressed with the final product. Will definitely order again!",
    author: "Emma Rodriguez",
    position: "Interior Designer",
    rating: 4,
    image: "https://randomuser.me/api/portraits/women/45.jpg",
  },
  {
    id: 4,
    content:
      "I've been in the fashion industry for 15 years, and Onyi Trims offers some of the finest embellishments I've worked with. Their attention to detail sets them apart.",
    author: "David Thompson",
    position: "Costume Designer",
    rating: 5,
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: 5,
    content:
      "The ornate buckles I purchased were perfect for my vintage-inspired collection. The customer service was also exceptional - they helped me find exactly what I needed.",
    author: "Olivia Parker",
    position: "Boutique Owner",
    rating: 5,
    image: "https://randomuser.me/api/portraits/women/67.jpg",
  },
];

const TestimonialCarousel = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  // Auto-advance slides
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((current) => (current + 1) % testimonials.length);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index) => {
    setActiveSlide(index);
  };

  const goToPrevSlide = () => {
    setActiveSlide((current) =>
      current === 0 ? testimonials.length - 1 : current - 1
    );
  };

  const goToNextSlide = () => {
    setActiveSlide((current) => (current + 1) % testimonials.length);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <svg
        key={index}
        className={`w-5 h-5 ${
          index < rating ? "text-yellow-300" : "text-gray-300"
        }`}
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 22 20"
      >
        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
      </svg>
    ));
  };

  return (
    <div
      className="relative w-full py-16 bg-gray-50 overflow-hidden"
      id="testimonial-carousel"
      style={{ zIndex: 0 }}
    >
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-40 h-40 md:w-60 md:h-60 bg-dun/5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-40 h-40 md:w-60 md:h-60 bg-dun/5 rounded-full translate-x-1/2 translate-y-1/2"></div>
      <div className="absolute top-1/4 right-10 w-20 h-20 bg-dun/5 rounded-full"></div>
      <div className="absolute bottom-1/4 left-10 w-20 h-20 bg-dun/5 rounded-full"></div>

      {/* Double quotation mark */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 text-dun/10 pointer-events-none">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          className="w-24 h-24"
          viewBox="0 0 975.036 975.036"
        >
          <path d="M925.036 57.197h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.399 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l36 76c11.6 24.399 40.3 35.1 65.1 24.399 66.2-28.6 122.101-64.8 167.7-108.8 55.601-53.7 93.7-114.3 114.3-181.9 20.601-67.6 30.9-159.8 30.9-276.8v-239c0-27.599-22.401-50-50-50zM106.036 913.497c65.4-28.5 121-64.699 166.9-108.6 56.1-53.7 94.4-114.1 115-181.2 20.6-67.1 30.899-159.6 30.899-277.5v-239c0-27.6-22.399-50-50-50h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.4 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l35.9 75.8c11.601 24.399 40.501 35.2 65.301 24.399z"></path>
        </svg>
      </div>

      {/* Carousel heading */}
      <div className="text-center mb-12 relative z-10">
        <h2 className="font-playfair text-3xl font-bold mb-4">
          What Our Customers Say
        </h2>
        <div className="w-24 h-1 bg-dun mx-auto mb-4"></div>
        <p className="text-gray-600 max-w-3xl mx-auto">
          Discover why designers and crafters choose our premium trims and
          embellishments
        </p>
      </div>

      {/* Carousel wrapper */}
      <div className="relative max-w-4xl mx-auto overflow-hidden">
        <div className="relative min-h-[300px] md:min-h-[280px]">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className={`absolute w-full transition-opacity duration-700 ease-in-out ${
                index === activeSlide ? "opacity-100 z-10" : "opacity-0 -z-10"
              }`}
            >
              <figure className="mx-auto px-8 md:px-4">
                <div className="flex items-center justify-center mb-4">
                  {renderStars(testimonial.rating)}
                </div>

                <blockquote>
                  <p className="text-xl md:text-2xl text-center font-medium text-gray-900 mb-8">
                    "{testimonial.content}"
                  </p>
                </blockquote>

                <figcaption className="flex items-center justify-center mt-6 space-x-3">
                  <img
                    className="w-10 h-10 rounded-full object-cover border-2 border-dun"
                    src={testimonial.image}
                    alt={`${testimonial.author} profile`}
                  />
                  <div className="flex items-center divide-x-2 divide-dun/30">
                    <cite className="pr-3 font-medium text-gray-900">
                      {testimonial.author}
                    </cite>
                    <cite className="pl-3 text-sm text-gray-600">
                      {testimonial.position}
                    </cite>
                  </div>
                </figcaption>
              </figure>
            </div>
          ))}
        </div>
      </div>

      {/* Slider indicators */}
      <div className="absolute z-30 flex space-x-3 -translate-x-1/2 bottom-4 left-1/2">
        {testimonials.map((_, index) => (
          <button
            key={index}
            type="button"
            className={`w-3 h-3 rounded-full border border-dun/30 transition-all duration-300 ${
              activeSlide === index
                ? "bg-dun w-6"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
            aria-current={activeSlide === index}
            aria-label={`Testimonial ${index + 1}`}
            onClick={() => goToSlide(index)}
          ></button>
        ))}
      </div>

      {/* Slider controls */}
      <button
        type="button"
        className="absolute top-1/2 left-4 z-30 flex items-center justify-center -translate-y-1/2 w-10 h-10 rounded-full bg-white/70 hover:bg-white shadow-md cursor-pointer transition-all duration-300 group focus:outline-none"
        onClick={goToPrevSlide}
      >
        <svg
          className="w-4 h-4 text-gray-800"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 6 10"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 1 1 5l4 4"
          />
        </svg>
        <span className="sr-only">Previous</span>
      </button>

      <button
        type="button"
        className="absolute top-1/2 right-4 z-30 flex items-center justify-center -translate-y-1/2 w-10 h-10 rounded-full bg-white/70 hover:bg-white shadow-md cursor-pointer transition-all duration-300 group focus:outline-none"
        onClick={goToNextSlide}
      >
        <svg
          className="w-4 h-4 text-gray-800"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 6 10"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 9 4-4-4-4"
          />
        </svg>
        <span className="sr-only">Next</span>
      </button>
    </div>
  );
};

export default TestimonialCarousel;
