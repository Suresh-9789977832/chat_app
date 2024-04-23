/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        "tablet": "769px",
        "mbig": "426px",
        "mmedi": "376px",
        "msmall":"321px"
      }
    },
  },
  plugins: [require("daisyui")],

}