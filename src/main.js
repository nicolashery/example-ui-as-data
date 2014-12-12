var React = require('react');
window.React = React;
var Main = require('./Main.jsx');
var app = window.app = require('./app');

app.component = React.render(
  React.createElement(Main), document.body
);
