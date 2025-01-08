const path = require('path');

module.exports = {
  entry: './src/components/MainApp.jsx',  // Entry point for the SDK
  output: {
    filename: 'your-sdk.bundle.js', // Output bundle file
    path: path.resolve(__dirname, 'dist'), // Output folder
    library: 'YourSDK', // Global variable for the SDK
    libraryTarget: 'umd', // Universal Module Definition
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  externals: {
    // Add any external dependencies that should not be bundled
  },
};
