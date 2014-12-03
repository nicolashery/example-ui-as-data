var Projections = {};

Projections.shownTodos = function(state) {
  return state.get('todos').filter(function(todo) {
    switch (state.get('nowShowing')) {
    case 'active':
      return !todo.get('completed');
    case 'completed':
      return todo.get('completed');
    default:
      return true;
    }
  });
};

Projections.activeTodoCount = function(state) {
  return state.get('todos').reduce(function(accum, todo) {
    return todo.get('completed') ? accum : accum + 1;
  }, 0);
};

Projections.completedTodoCount = function(state) {
  return state.get('todos').size - this.activeTodoCount(state);
};

Projections.isShowingFooter = function(state) {
  return Boolean(this.activeTodoCount(state) || this.completedTodoCount(state));
};

Projections.isShowingTodoList = function(state) {
  return Boolean(state.get('todos').size);
};

module.exports = Projections;
