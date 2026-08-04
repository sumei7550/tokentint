const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

const URLS = {
  local: 'http://localhost:3000',
  production: 'https://www.tokentint.xyz'
};

module.exports = (env = {}, argv = {}) => {
  const target = env.target || (argv.mode === 'development' ? 'local' : 'production');
  const appBaseUrl = env.baseUrl || URLS[target];

  if (!appBaseUrl) {
    throw new Error(`Unknown TokenTint target: ${target}. Use local or production.`);
  }

  return {
    entry: {
      popup: './src/popup/popup.ts',
      background: './src/background/background.ts'
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].js',
      clean: true
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          use: 'ts-loader',
          exclude: /node_modules/
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader']
        }
      ]
    },
    resolve: {
      extensions: ['.ts', '.js']
    },
    plugins: [
      new webpack.DefinePlugin({
        __TOKENTINT_APP_BASE_URL__: JSON.stringify(appBaseUrl)
      }),
      new CopyPlugin({
        patterns: [
          { from: 'public/manifest.json', to: 'manifest.json' },
          { from: 'public/popup.html', to: 'popup.html' },
          { from: 'public/icons', to: 'icons' },
          { from: '_locales', to: '_locales' }
        ]
      })
    ]
  };
};
