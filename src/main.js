var React = require('react');
window.React = React;
var App = require('./components/App.jsx');
var app = window.app = require('./app');

app.component = React.render(
  React.createElement(App), document.body
);
