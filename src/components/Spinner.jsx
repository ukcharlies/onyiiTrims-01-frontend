import React from "react";

const Spinner = ({ size = "md" }) => {
  const sizes = {
    sm: "w-5 h-5",
    md: "w-8 h-8",
    lg: "w-12 h-12",
    xl: "w-16 h-16",
  };

  const sizeClass = sizes[size] || sizes.md;

  return (
    <div className="flex justify-center items-center">
      <div
        className={`${sizeClass} rounded-full border-2 border-dun/30 border-t-dun animate-spin`}
        role="status"
        aria-label="Loading"
      ></div>
    </div>
  );
};

export default Spinner;
