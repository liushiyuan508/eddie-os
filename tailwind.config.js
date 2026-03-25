/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'system': ['Tahoma', 'MS Sans Serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        white: '#FFFFFF',
        black: '#000000',
        'window-bg': '#F0F0F0',
        'window-bar': '#C0C0C0',
      },
      spacing: {
        '1px': '1px',
      },
      borderWidth: {
        '2px': '2px',
      },
    },
  },
  plugins: [],
}