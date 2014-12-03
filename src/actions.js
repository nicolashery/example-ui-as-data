var Immutable = require('immutable');

var actions = {};

actions.addTodo = function(state, title) {
  var todo = Immutable.Map({
    id: this._nextTodoId(state),
    title: title,
    completed: false
  });
  return state.update('todos', function(todos) {
    return todos.push(todo);
  });
};

actions._nextTodoId = function(state) {
  var lastTodo = this._lastTodo(state);
  if (!lastTodo) {
    return 1;
  }
  else {
    return lastTodo.get('id') + 1;
  }
};

actions._lastTodo = function(state) {
  return state.get('todos', Immutable.List()).last();
};

actions.toggleAll = function(state, checked) {
  return state.update('todos', function(todos) {
    return todos.map(function(todo) {
      return todo.set('completed', checked);
    });
  });
};

actions.toggle = function(state, id) {
  return this._updateTodo(state, id, function(todo) {
    return todo.update('completed', function(checked) {
      return !checked;
    });
  });
};

actions._updateTodo = function(state, id, updateFn) {
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

actions.destroy = function(state, id) {
  return state.update('todos', function(todos) {
    return todos.filter(function(todo) {
      return todo.get('id') !== id;
    });
  });
};

actions.save = function(state, id, text) {
  state = this.closeEdit(state);
  return this._updateTodo(state, id, function(todo) {
    return todo.set('title', text);
  });
};

actions.clearCompleted = function(state) {
  return state.update('todos', function(todos) {
    return todos.filter(function(todo) {
      return !todo.get('completed');
    });
  });
};

actions.show = function(state, showing) {
  return state.set('nowShowing', showing);
};

actions.openEdit = function(state, id) {
  return state.set('editing', id);
};

actions.closeEdit = function(state) {
  return state.set('editing', null);
};

module.exports = actions;
