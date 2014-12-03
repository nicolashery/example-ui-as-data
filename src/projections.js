var projections = {};

projections.shownTodos = function(state) {
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

projections.activeTodoCount = function(state) {
  return state.get('todos').reduce(function(accum, todo) {
    return todo.get('completed') ? accum : accum + 1;
  }, 0);
};

projections.completedTodoCount = function(state) {
  return state.get('todos').size - this.activeTodoCount(state);
};

projections.isShowingFooter = function(state) {
  return Boolean(this.activeTodoCount(state) || this.completedTodoCount(state));
};

projections.isShowingTodoList = function(state) {
  return Boolean(state.get('todos').size);
};

module.exports = projections;
