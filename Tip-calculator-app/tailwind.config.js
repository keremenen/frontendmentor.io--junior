/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js}'],
  theme: {
    extend: {
      fontFamily: {
        body: ['Space Mono'],
      },
      colors: {
        'strong-cyan': '#26C2AE',
        'very-dark-cyan': '#00474B',
        'dark-grayish-cyan': '#5e7a7d',
        'grayish-cyan': '#7F9D9F',
        'light-grayish-cyan': '#c5e4e7',
        'very-light-grayish-cyan': '#F3F9FA',
      },
      lineHeight: {
        12: '3rem',
      },
      backgroundImage: {
        'dollar-icon': "url('../../assets/images/icon-dollar.svg')",
        'user-icon': "url('../../assets/images/icon-person.svg')",
      },
    },
  },
  plugins: [],
}
