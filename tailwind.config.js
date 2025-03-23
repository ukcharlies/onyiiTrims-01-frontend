/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
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
        shake: {
          "0%, 100%": { transform: "translateX(0)" },
          "10%, 30%, 50%, 70%, 90%": { transform: "translateX(-5px)" },
          "20%, 40%, 60%, 80%": { transform: "translateX(5px)" },
        },
      },
      animation: {
        marquee: "marquee 45s linear infinite",
        marquee2: "marquee2 45s linear infinite",
        shake: "shake 0.5s cubic-bezier(.36,.07,.19,.97) both",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
