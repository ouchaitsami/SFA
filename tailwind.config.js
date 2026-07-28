/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        serif: ['"Playfair Display"', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        ice: '#FAF7F2',
        cream: '#F4EEE4',
        glacier: 'rgba(26,20,16,0.12)',
        frost: 'rgba(26,20,16,0.08)',
        ink: '#1A1410',
        slate600: '#6B5F53',
        lime: {
          DEFAULT: '#1E7268',
          soft: '#3EA094',
          glow: '#1E7268',
        },
        raspberry: {
          DEFAULT: '#A61D5A',
          dark: '#7A1342',
          soft: '#D9458E',
        },
      },
      boxShadow: {
        'glass': '0 1px 0 0 rgba(255,255,255,0.05) inset, 0 30px 60px -30px rgba(0,0,0,0.6)',
        'cta': '0 10px 30px -10px rgba(166,29,90,0.6)',
      },
    },
  },
  plugins: [],
};
