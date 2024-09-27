/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",

  ],
  theme: {
    extend: {
    colors: {
      'whiteColor': '#ffffff',
      'blackColor': '#000000',
      'borderColor': '#c2c2c2',
      'bgColor': '#474747',
    }
    },
  },
  plugins: [],
}

