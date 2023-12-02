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
    },
  },
  plugins: [require("daisyui")],
};
