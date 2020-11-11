console.log("development");
const path = require("path");

const merge = require("webpack-merge");
const common = require("./webpack.common.js");
const devServer = {
  port: 3000,
  open: true,
  disableHostCheck: true,
  historyApiFallback: true,
  overlay: true,
  stats: "minimal",
  inline: true,
  compress: true,
  contentBase: "/",
  clientLogLevel: "error",
};
const config = {
  mode: "development", //production,development
  devtool: "source-map", //cheap-module-source-map
  devServer,
};
module.exports = merge(
  {
    ...common,
    output: {
      path: path.join(__dirname, "dist"),
      filename: "[chunkhash].[chunkhash].js",
      chunkFilename: "[chunkhash].bundle.js",
      publicPath: "/",
    },
  },
  config
);
