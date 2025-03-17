import React from "react";

const Home = () => {
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

      {/* Rest of the content */}
      <div className="relative bg-white">
        <div className="container mx-auto px-4 py-16">
          <h2 className="font-playfair text-3xl font-bold mb-8">
            Featured Collections
          </h2>
          {/* Add your other content sections here */}
        </div>
      </div>
    </main>
  );
};

export default Home;
