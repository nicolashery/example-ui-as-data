var Immutable = require('immutable');

var state = {};

state.initial = function() {
  return Immutable.fromJS({
    todos: [],
    nowShowing: 'all',
    editing: null
  });
};

module.exports = state;
