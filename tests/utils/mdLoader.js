// a markdown transform preprocessor to allow snapshot testing to work with the gnomad markdown loader
//   reference: https://stackoverflow.com/questions/39483893/how-can-i-use-my-webpacks-html-loader-imports-in-jest-tests

const mdLoader = require('@gnomad/markdown-loader')

module.exports = {
  process(src, filename, config, options) {
    // attempt to call the function itself
    // return mdLoader.markdownLoader(src);

    return mdLoader(src)
  },
}
