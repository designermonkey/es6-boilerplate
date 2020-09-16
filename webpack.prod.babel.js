import path from 'path';
import { merge } from 'webpack-merge';
import common from './webpack.common.babel.js';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import TerserJSPlugin from 'terser-webpack-plugin';
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin';


export default (env, argv) => {
  return merge(common(env, argv), {
    mode: 'production',
    devtool: 'source-map',
    optimization: {
      moduleIds: 'hashed',
      minimize: true,
      minimizer: [
        new TerserJSPlugin(),
        new OptimizeCSSAssetsPlugin()
      ],
      runtimeChunk: 'single',
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
          styles: {
            test: /\.css$/,
            name: 'styles',
            chunks: 'all',
          }
        },
      },
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: path.join('css', '[name].[contenthash].css'),
      }),
    ],
    output: {
      filename: path.join('js', '[name].[contenthash].js'),
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
              name: '[name].[contenthash].[ext]',
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
              name: '[name].[contenthash].[ext]',
            },
          },
        },
      ]
    }
  })
};
