/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/lib/esm/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        dun: "#C4A484",
      },
      fontFamily: {
        playfair: ['"Playfair Display"', "serif"],
        lora: ["Lora", "serif"],
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-100%)" },
        },
        marquee2: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0%)" },
        },
      },
      animation: {
        marquee: "marquee 45s linear infinite",
        marquee2: "marquee2 45s linear infinite",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
