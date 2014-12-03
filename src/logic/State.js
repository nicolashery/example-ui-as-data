var Immutable = require('immutable');

var State = {};

State.initial = function() {
  return Immutable.fromJS({
    todos: [],
    nowShowing: 'all',
    editing: null
  });
};

module.exports = State;
