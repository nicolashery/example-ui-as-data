var path = require('path');

var config = {
  entry: './src/main.js',
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {test: /\.jsx$/, loader: 'jsx'},
      {test: /\.css$/, loader: 'style!css'}
    ]
  }
};

module.exports = config;
