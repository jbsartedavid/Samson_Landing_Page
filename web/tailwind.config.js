module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          50: '#fbf7f0',
          100: '#f5ede0',
          200: '#e0b458',
          300: '#d4a349',
          400: '#c8923a',
          500: '#b8892e',
          600: '#a07824',
          700: '#7a6240',
          800: '#5a4830',
          900: '#3f2b17',
        },
      },
      fontFamily: {
        sans: ['Manrope', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
