const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, 'dist'),
      chunkFilename: '[id].[chunkhash].js'
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: 'Text Editor',
        template: './index.html',
      }),
      new WebpackPwaManifest({
        inject: true,
        name: 'Just Another Text Editor',
        short_name: 'JATE',
        description: 'A text editor for coding!',
        background_color: '',
        crossorigin: 'anonymous',
        icons: [
          {
            src: path.resolve('src/images/logo.png'),
            sizes: [96],
            destination: path.join('assets', 'icons'),
          },
        ],
      }),
      new WorkboxPlugin.GenerateSW(),
      new InjectManifest({
        swSrc: './src-sw.js',
        swDest: 'src-sw.js',
      }),
    ],

    module: {
      rules: [
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        },
      ],
    },
  };
};
