const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    main: './src/index.ts',
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    // publicPath: '/dist/',
    assetModuleFilename: 'assets/[name][ext]',
    clean: true,
  },

  devtool: 'eval-cheap-source-map',

  devServer: {
    port: 8081,
    open: true,
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    new CopyPlugin({
      patterns: [
        { from: './src/assets/images', to: './assets/images' },
        { from: './src/assets/audio', to: './assets/audio' },
      ],
    }),
  ],

  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.[tj]s$/,
        use: ['ts-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/images/[name][ext]',
        },
      },
      {
        test: /\.svg$/i,
        type: 'asset',
        generator: {
          filename: 'assets/icons/[name][ext]',
        },
        use: 'svgo-loader',
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/fonts/[name][ext]',
        },
      },
      {
        test: /\.mp3$/i,
        type: 'asset/resource',
        generator: {
          filename: `assets/audio/[name][ext]`,
        },
      },
    ],
  },

  resolve: {
    extensions: ['.js', '.json', '.scss', '.ts'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
};
