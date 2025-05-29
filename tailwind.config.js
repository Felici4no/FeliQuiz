/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'fb-blue': {
          light: '#8b9dc3',
          DEFAULT: '#3b5998',
          dark: '#2d4373',
        },
        'fb-gray': '#f7f7f7',
        'fb-border': '#dddfe2',
      },
      boxShadow: {
        'fb': '0 1px 1px rgba(0, 0, 0, 0.1)',
      },
      fontFamily: {
        'lucida': ['"Lucida Grande"', '"Lucida Sans Unicode"', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
};