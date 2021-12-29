module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    backgroundColor: theme => ({
      ...theme('colors'),
      'primary': '#d5def5',
      'btn': '#003CFF',
      'danger': '#e3342f',
      'choco':'#FF4019',
     }),
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
