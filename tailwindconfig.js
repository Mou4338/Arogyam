module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#132d2e",         // Deep teal
        secondary: "#64bcae",       // Mint green
        accent: "#ab373d",          // Alert red
        muted: "#e5e5e5",           // Light gray
        light: "#ebf2f0",
        dark: "#253642",
      },
      fontFamily: {
        heading: ['"Segoe UI"', "sans-serif"],
        body: ['"Arial"', "sans-serif"],
      },
    },
  },
  plugins: [],
};