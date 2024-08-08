/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', 'index.html'],
  darkMode: false, // or 'media' or 'class'
	theme: {
    extend: {
      colors: {
        starwars: {
          primary: '#ffcc00',
          secondary: '#1a1a1a',
          buttonPrimary: '#d32f2f',
          buttonSecondary: '#1976d2',
          buttonDisabled: '#9e9e9e',
        },
      },
    },
  },
  variants: {
    extend: {
      opacity: ['disabled'],
      cursor: ['disabled'],
    },
  },
  plugins: [],
};
