import path from 'path';
import { merge } from 'webpack-merge';
import common from './webpack.common.js';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

module.exports = (env, argv) => {

  let config = common(env, argv);

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
