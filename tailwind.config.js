/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      // ── PALETTE NOIR & BLANC MODERNE ────────────────────
      colors: {
        ink:   { DEFAULT: "#0D0D0D", light: "#1F1F1F", soft: "#3A3A3A" },
        ash:   { DEFAULT: "#F7F7F7", dark: "#EEEEEE", deeper: "#E0E0E0" },
        accent:{ DEFAULT: "#0D0D0D", hover: "#333333" },
      },
      fontFamily: {
        display: ["'Bebas Neue'", "sans-serif"],   // titres forts, impactants
        body:    ["'DM Sans'", "sans-serif"],       // corps lisible et moderne
        accent:  ["'Playfair Display'", "serif"],   // citations élégantes
      },
    },
  },
  plugins: [],
};
