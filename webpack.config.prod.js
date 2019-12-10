

// export default{
//   debug: true,
//   //devtool: 'inline-source-map',
//   noInfo: false,
//   entry: [
//     path.resolve(__dirname, 'src/index')
//   ],
//   target: 'web',
//   output: {
//     path: path.resolve(__dirname, 'src'),
//     publicPath: '/',
//     filename: 'bundle.js'
//   },

//   //plugins: [],
//   //module: {
//   //  loaders: [
//   //    {test: /\.js$/, exclude: /node_modules/, loaders: ['babel']},
//   //    {test: /\.css$/, loaders: ['style','css']}
//   //  ]
//   //}
// };

const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniSccExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");
//const webpack = require("webpack");

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  target: 'web',
  entry: {
    //path.resolve(__dirname, 'src/index')
    vendor: path.resolve(__dirname, 'src/vendor'),
    main: path.resolve(__dirname, 'src/index')
  },
  optimization: {
    minimize: true,
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: "all"
        },
      },
    },
  },
  //devServer: {
  //  //contentBase: path.resolve(__dirname, 'src')
  //  noInfo: true
  //},
  stats: "errors-only",
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name].[contenthash].js'
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
        filename: "./index.html",
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          useShortDoctype: true,
          removeRedundantAttributes: true,
          removeEmptyAttributes: true,
          removeStyleLinkTypeAttributes: true,
          keepClosingSlash: true,
          minifyJS: true,
        }
     }),

      new MiniSccExtractPlugin({
          filename: "[name].css",
          chunkFilename: "[id].css"
      }),
  ]
}
