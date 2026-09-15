/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        obsidian: "#0B0A08",
        espresso: "#17120E",
        ivory: "#F4EFE6",
        parchment: "#E9DFCF",
        champagne: "#D6C19B",
        antiquegold: "#B9975B",
        highlightgold: "#D8B66A",
      },
      fontFamily: {
        serif: ["'Cormorant Garamond'", "serif"],
        sans: ["Manrope", "sans-serif"],
      },
    },
  },
  plugins: [],
};
