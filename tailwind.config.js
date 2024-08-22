/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/tailwind-datepicker-react/dist/**/*.js",
    "./node_modules/flowbite/**/*.js"
  ],
  darkMode: 'selector',
  theme: {
    extend: {
      colors: {
        "primary": {
          50: "#E2F0FE",
          100: "#C9E3FD",
          200: "#8EC4FB",
          300: "#58A8F8",
          400: "#228CF6",
          500: "#086ED3",
          600: "#06529D",
          700: "#043565",
          800: "#032445",
          900: "#011222",
          950: "#01080F"
        },
        "primary-contrast": {
          50: "#000000",
          100: "#000000",
          200: "#000000",
          300: "#000000",
          400: "#FFFFFF",
          500: "#FFFFFF",
          600: "#FFFFFF",
          700: "#FFFFFF",
          800: "#FFFFFF",
          900: "#FFFFFF",
          950: "#FFFFFF"
        }
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

