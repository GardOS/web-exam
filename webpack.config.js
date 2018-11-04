const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: path.resolve(__dirname, "src", "client", "index.jsx"),
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js"
  },
  devtool: "source-map",
  devServer: {
    contentBase: "./dist",
    hot: true,
    historyApiFallback: true
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: "babel-loader",
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        loader: "style-loader!css-loader"
      }
    ]
  },
  resolve: {
    extensions: [".js", ".jsx"]
  },
  plugins: [new webpack.HotModuleReplacementPlugin()]
};
