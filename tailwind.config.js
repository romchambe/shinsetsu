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
    colors:{

    },
    extend: {
      //extends tailwind's default here
      spacing: {'9': '2.25rem'}
    },
  },
  variants: {},
  plugins: [],
}
