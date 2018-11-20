const path = require("path");

module.exports = {
  entry: path.resolve(__dirname, "src", "client", "index.jsx"),
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: "babel-loader",
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [".js", ".jsx"]
  }
};
