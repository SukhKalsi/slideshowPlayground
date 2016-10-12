const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry  : __dirname + '/src/index.js',
  output : {
    path     : __dirname,
    filename : 'dist.js'
  },
  module : {
    loaders: [
      {
        test   : /.js$/,
        exclude: /node_modules/,
        loader : 'babel-loader'
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        loader: ExtractTextPlugin.extract('style-loader', ['css-loader', 'postcss-loader', 'sass-loader'])
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin("styles.css")
  ]
};
