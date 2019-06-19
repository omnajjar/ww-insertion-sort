const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const MODES = {DEVELOPMENT: "development", PRODUCTION: "production"};
const isDev = process.env.MODE === MODES.DEVELOPMENT;

const distDir = path.resolve(__dirname, "dist");

module.exports = {
  mode: isDev ? "development" : "production",
  devtool: "source-map",
  watch: isDev,
  entry: "./src/main.js",
  output: {
    path: distDir,
    filename: "[name].bundle.js",
    globalObject: "this"
  },
  devServer: {
    contentBase: "./dist",
    hot: true,
    open: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      },
      {
        test: /\.?worker\.js$/,
        use: {
          loader: "worker-loader",
          options: {
            name: "[name].js"
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: isDev
            }
          },
          "css-loader"
        ]
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: ["file-loader", "image-webpack-loader"]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: false,
      template: "./src/template/index.ejs"
    }),
    new MiniCssExtractPlugin({
      filename: "style.css"
    })
  ]
};
