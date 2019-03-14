var path = require('path')

const entry = path.resolve(__dirname, 'client/index.js');
const output = {
  path: path.resolve(__dirname, 'build'),
  filename: 'bundle.js',
}

module.exports = {
  entry, output,
  mode: process.env.NODE_ENV,
  devServer: {
    publicPath: '/build/',
    proxy: [{
      context: ['/api', '/login', '/logout', '/socket.io', '/addphoto'],
      target: 'http://localhost:3000'
    }]
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      }
    ]
  }
}