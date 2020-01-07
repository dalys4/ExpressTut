const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniSccExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");
//const webpack = require("webpack");

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  target: 'web',
  entry: [
     path.resolve(__dirname, 'src/views')
  ],
  //devServer: {
  //  //contentBase: path.resolve(__dirname, 'src')
  //  noInfo: true
  //},
  stats: "errors-only",
  output: {
    path: path.resolve(__dirname, 'src'),
    publicPath: '/',
    filename: 'bundle.js'
  },

  module:{
      rules: [{
          test: /\.js$/,
          exclude: /node_modules/,
          use: [{
              loader: "babel-loader"
          }]
      },{
          test: /\.html$/,
          use: [{
              loader: "html-loader",
              options: {minimize: true}

          }]
      },{
          test: /\.(png|svg|jpg|gif)$/,
          use: [
              "file-loader"
          ]
      },{
          test: /\.scss$/,
          use: [
              "style-loader",
              "css-loader",
              "sass-loader"
          ]
      }]
  },
  plugins: [
      new HtmlWebPackPlugin({
         template: "./src/index.html",
         filename: "./index.html"
      }),

      new MiniSccExtractPlugin({
          filename: "[name].css",
          chunkFilename: "[id].css"
      }),
  ]
}
