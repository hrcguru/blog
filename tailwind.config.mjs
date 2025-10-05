/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        'primary-yellow': '#F4D03F',
        'accent-yellow': '#F7DC6F',
        'dark-green': '#1B4332',
        'medium-green': '#2D5A3D',
        'light-green': '#40916C',
        'ivory': '#FFFEF7',
        'warm-ivory': '#FDF8E8'
      },
      borderRadius: {
        '2xl': '1.25rem'
      },
      boxShadow: {
        'soft': '0 10px 30px rgba(244, 208, 63, 0.15)'
      }
    }
  },
  plugins: []
}
