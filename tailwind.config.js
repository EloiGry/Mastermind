const defaultTheme = require("tailwindcss/defaultTheme")

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'transparent': 'transparent',
        'black': '#081c15',
        'white': '#ffffff',
        'lightBrown': '#e6ccb2',
        'violet': '#b298dc',
        'blue': '#a5adff'
      },
      fontFamily: {
        'patrick': ['Patrick Hand', ...defaultTheme.fontFamily.sans]
      },
    },
  },
  plugins: [],
}