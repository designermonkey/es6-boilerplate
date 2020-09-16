import path from 'path';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import ManifestPlugin from 'webpack-manifest-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { nodeModulesSync } from './libs/sass-include-paths';

let sassIncludePaths = nodeModulesSync();

console.log(sassIncludePaths);

export default (env, argv) => {
  let config = {
    entry: {
      application: path.join(__dirname, 'src', 'index.jsx'),
    },
    plugins: [
      new CleanWebpackPlugin(),
      new ManifestPlugin(),
      new HtmlWebpackPlugin({
        filename: 'index.html',
        title: 'Boilerplate',
        meta: {
          viewport: 'width=device-width, initial-scale=1'
        }
      }),
    ],
    output: {
      path: path.join(__dirname, 'public'),
    },
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
                hmr: (argv.mode !== 'production')
              }
            },
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1
              }
            },
            'postcss-loader',
            'resolve-url-loader',
            {
              loader: 'sass-loader',
              options: {
                sassOptions: {
                  includePaths: sassIncludePaths.concat([
                    'node_modules/**/src',
                    'node_modules/**/dist',
                    'libs'
                  ]),
                }
              }
            },
          ],
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
    resolve: {
      extensions: [
        '.js',
        '.jsx'
      ]
    }
  };

  if (argv.analyze) {
    config.plugins.push(new BundleAnalyzerPlugin());
  }

  return config;
};
