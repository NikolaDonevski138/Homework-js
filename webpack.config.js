const path = require('path')
const WriteFilePlugin = require('write-file-webpack-plugin')

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "public/build")
  },
  watch: true,
  devServer: {
    contentBase: path.resolve(__dirname, "public"),
    port: 3000
  },
  plugins: [
    new WriteFilePlugin()
  ]
}