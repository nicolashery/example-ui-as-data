var React = require('react');
window.React = React;
var App = require('./components/App.jsx');

window.Immutable = require('immutable');
var app = window.app = {};
app.state = require('./state');
app.actions = require('./actions');
app.projections = require('./projections');

var state = app.state.initial();
state = app.actions.addTodo(state, 'Groceries');
state = app.actions.addTodo(state, 'Cleaning');
state = app.actions.toggle(state, 1);
window.state = state;

React.render(React.createElement(App), document.body);
