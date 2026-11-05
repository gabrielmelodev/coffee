/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx}', './components/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: { espresso: '#4B2E1A', caramel: '#7B4E2F', latte: '#D7C2A3', paper: '#EFE7D9', ink: '#1A1A1A' },
      fontFamily: { display: ['var(--font-display)', 'serif'], sans: ['var(--font-body)', 'system-ui', 'sans-serif'] },
    },
  },
  plugins: [],
};
