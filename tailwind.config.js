/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        Abel:['Abel', 'sans-serif']
      }
    },
  },
  plugins: [require("daisyui")],
}

