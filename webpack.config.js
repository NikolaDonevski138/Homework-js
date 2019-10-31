const path = require('path')

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "public/build")
  },
  watch: false,
  devServer: {
    contentBase: path.resolve(__dirname, "public"),
    port: 3000
  }
}