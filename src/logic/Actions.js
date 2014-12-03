var Immutable = require('immutable');

var Actions = {};

Actions.addTodo = function(state, title) {
  var todo = Immutable.Map({
    id: this._nextTodoId(state),
    title: title,
    completed: false
  });
  return state.update('todos', function(todos) {
    return todos.push(todo);
  });
};

Actions._nextTodoId = function(state) {
  var lastTodo = this._lastTodo(state);
  if (!lastTodo) {
    return 1;
  }
  else {
    return lastTodo.get('id') + 1;
  }
};

Actions._lastTodo = function(state) {
  return state.get('todos', Immutable.List()).last();
};

Actions.toggleAll = function(state, checked) {
  return state.update('todos', function(todos) {
    return todos.map(function(todo) {
      return todo.set('completed', checked);
    });
  });
};

Actions.toggle = function(state, id) {
  return this._updateTodo(state, id, function(todo) {
    return todo.update('completed', function(checked) {
      return !checked;
    });
  });
};

Actions._updateTodo = function(state, id, updateFn) {
  return state.update('todos', function(todos) {
    return todos.map(function(todo) {
      if (todo.get('id') === id) {
        return updateFn(todo);
      }
      else {
        return todo;
      }
    });
  });
};

Actions.destroy = function(state, id) {
  return state.update('todos', function(todos) {
    return todos.filter(function(todo) {
      return todo.get('id') !== id;
    });
  });
};

Actions.save = function(state, id, text) {
  state = this.closeEdit(state);
  return this._updateTodo(state, id, function(todo) {
    return todo.set('title', text);
  });
};

Actions.clearCompleted = function(state) {
  return state.update('todos', function(todos) {
    return todos.filter(function(todo) {
      return !todo.get('completed');
    });
  });
};

Actions.show = function(state, showing) {
  return state.set('nowShowing', showing);
};

Actions.openEdit = function(state, id) {
  return state.set('editing', id);
};

Actions.closeEdit = function(state) {
  return state.set('editing', null);
};

module.exports = Actions;
