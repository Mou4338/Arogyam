module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
        "./pages/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: '#132d2e',    // Deep teal - used for headers, navbars, and branding accents
                secondary: '#64bcae',  // Mint green - used for buttons, links, or highlights
                dark: '#253642',       // Slate blue-gray - used for dark mode backgrounds or text
                light: '#ebf2f0',      // Very light green-gray - ideal for background sections or cards
            },
            fontFamily: {
                body: ['Arial', 'sans-serif'],
                heading: ['Segoe UI', 'sans-serif'],
            },
        },
    },
    plugins: [],
};
module.exports = {
  content: ['./pages/**/*.{js,jsx}', './components/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        arogyam: '#64bcae',
        darkteal: '#132d2e',
        offwhite: '#f8f9f9'
      }
    }
  },
  plugins: []
};
