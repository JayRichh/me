const path = require("path");
const { VueLoaderPlugin } = require("vue-loader");
const Dotenv = require("dotenv-webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/main.ts",
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader",
      },
      {
        test: /\.ts$/,
        loader: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: ["vue-style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.css$/,
        use: ["vue-style-loader", "css-loader"],
      },
    ],
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "../../dist/client"),
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "../src"),
      three: path.resolve("./node_modules/three"),
    },
    extensions: [".tsx", ".ts", ".js", ".vue", ".json", ".scss", ".css"],
    fallback: {
      fs: false,
      path: false,
      crypto: false,
      stream: false,
      zlib: false,
      http: false,
      https: false,
      os: false,
      net: false,
      tls: false,
      child_process: false,
      module: false,
      assert: false,
      constants: false,
      util: false,
      buffer: false,
      async_hooks: false,
      url: false,
      querystring: false,
      punycode: false,
      process: false,
      vm: false,
      events: false,
      timers: false,
      console: false,
    },
  },
  plugins: [
    new Dotenv(),
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};
