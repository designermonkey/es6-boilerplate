const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

let sassIncludePaths = require('sass-include-paths').nodeModulesSync();

module.exports = (env, argv) => {

  const isDevelopmentMode = argv.mode !== 'production';

  let config = {
    mode: 'production',
    entry: {
      application: path.join(__dirname, 'src', 'index.jsx'),
    },
    output: {
      path: path.join(__dirname, 'public'),
      filename: path.join('js', '[name].[contenthash].js'),
    },
    optimization: {
      moduleIds: 'hashed',
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
      new ManifestPlugin(),
      new HtmlWebpackPlugin({
        filename: 'index.html',
        title: 'Boilerplate',
        meta: {
          viewport: 'width=device-width, initial-scale=1'
        }
      }),
      new MiniCssExtractPlugin({
        filename: path.join('css', '[name].[contenthash].css'),
      }),
      new CleanWebpackPlugin(),
    ],
    module: {
      rules: [

        // Css and Sass Configuration
        {
          test: /\.(sa|sc|c)ss$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                publicPath: '../',
                hmr: isDevelopmentMode
              }
            },
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1
              }
            },
            'postcss-loader',
            // {
            //   loader: 'resolve-url-loader',
            //   options: {
            //     root: '/',
            //   }
            // },
            {
              loader: 'sass-loader',
              options: {
                sassOptions: {
                  includePaths: sassIncludePaths.concat([
                    'libs'
                  ]),
                }
              }
            },
          ],
        },

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

        // JavaScript and ReactJS Configuration
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {}
          },
        }
      ],
    },
  };

  if (isDevelopmentMode) {

    config.mode = 'development';
    config.devtool = 'inline-source-map';
    config.watchOptions = {
      ignored: /node_modules/
    };
  };

  if (argv.analyze) {
    config.plugins.push(new BundleAnalyzerPlugin());
  }

  return config;
}
