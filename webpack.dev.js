const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { exit } = require('process');

// console.log(process);
// exit(0);

module.exports = (env, argv) => {

  let config = common(env, argv);

  console.log(process.env.)

  return merge(config, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
      contentBase: config.output.path,
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: path.join('css', '[name].css'),
      }),
    ],
    output: {
      filename: path.join('js', '[name].js'),
    },
    module: {
      rules: [
        // Images and Files Configuration
        {
          test: /\.(png|svg|jpe?g|gif)$/,
          use: {
            loader: 'file-loader',
            options: {
              outputPath: 'img',
              name: '[name].[ext]',
            },
          },
        },

        // Fonts Configuration
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          use: {
            loader: 'file-loader',
            options: {
              outputPath: 'fonts',
              name: '[name].[ext]',
            },
          },
        },
      ]
    }
  })
};
