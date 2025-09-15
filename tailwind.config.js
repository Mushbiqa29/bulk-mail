/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#007ACC',
        secondary: '#E53935', 
        accent1: '#8E24AA', 
        accent2: '#43A047', 
        accent3: '#FDD835', 
        accent4: '#FB8C00', 
      },
      fontFamily: {
        'neue-machina': ['Neue Machina', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
