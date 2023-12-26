/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Abel: ["Abel", "sans-serif"],
      },
      colors: {
        primary: "#EDF2FC",
        secondary: "#DFE4ED",
      },
      gridTemplateColumns: {
        // Simple 16 column grid
        16: "1fr,2fr,1fr",

        // Complex site-specific column configuration
        // footer: "200px minmax(900px, 1fr) 100px",
      },
      boxShadow: {
        "3xl": "0 35px 60px -15px rgba(0, 0, 0, 0.4)",
      },
    },
  },
  plugins: [require("daisyui")],
};
