var React = require('react');
window.React = React;
var Main = require('./Main.jsx');

require('./style.css');

React.render(React.createElement(Main), document.body);
