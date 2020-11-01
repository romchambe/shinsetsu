const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  future: {
    // removeDeprecatedGapUtilities: true,
    // purgeLayersByDefault: true,
  },
  purge: [
    'src/**/*.js',
    'src/**/*.jsx',
    'src/**/*.ts',
    'src/**/*.tsx',
    'public/**/*.html',
  ],
  theme: {
    extend: {
      //extends tailwind's default here
      spacing: {'9': '2.25rem'}, 
      fontFamily: {
        sans: [
          'YogaSansPro',
          ...defaultTheme.fontFamily.sans,
        ]
      },
      colors:{
        "funky-text": "#9a82e6",
        "setting-sun": "#b09afe",
        "purple-border": "#e3dcfa",
        "shadow": "#72542b",
        "day-sun": "#ffdaa7",
        "yellow-border": "#ffefd8",
        "yellow-gradient": "#fff6ea",
        "yellow-page-bg": "#fffaf5",
        "black": "#262626",
        "grey-lt-1": "#7b7982",
        "main": "#fe7e7e",
        "rising-sun": "#ff9696",
        "red-border": "#ffe1e1",
        "red-gradient": "#ffebeb"
      },
    },
  },
  variants: {},
  plugins: [],
}
