/** @type {import('tailwindcss').Config} */
import { nextui } from "@nextui-org/react";

module.exports = {
  content: [
    "./pages/**/*.js",
    "./app/**/*.js",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"], // Set 'Inter' as the default sans-serif font
        jersey: ["Jersey 10", "sans-serif"],
      },
      colors: {
        white: "#FFFFFF",
      },
    },
  },

  darkMode: "class",
  plugins: [nextui()],
};
