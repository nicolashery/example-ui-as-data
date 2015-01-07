var d3 = window.d3;
var app = require('../app');

var ENTER_KEY = 13;

var el;

function create(element) {
  el = element;
  app.addChangeListener(render);
}

function destroy() {
  app.removeChangeListener(render);
}

function render() {
  if (!el) {
    throw new Error('Can\'t render without an element');
  }

  renderNewTodo();
  renderTodos();
}

function renderNewTodo() {
  var container = d3.select(el).selectAll('.newTodo')
  .data([0]);

  container.enter().append('p').attr('class', 'newTodo');
  container.enter().append('strong').text('New todo: ');
  container.enter().append('input')
    .on('keydown', handleNewTodoKeyDown);
}

function handleNewTodoKeyDown() {
  var e = d3.event;
  if (e.which !== ENTER_KEY) {
    return;
  }
  e.preventDefault();

  var val = this.value.trim();
  if (val) {
    app.actions.addTodo(val);
    this.value = '';
  }
}

function renderTodos() {
  var container = d3.select(el).selectAll('.todos')
    .data([0]);
  container.enter().append('div').attr('class', 'todos');

  var data;
  if (!app.projections.isShowingTodoList()) {
    data = [];
  }
  else {
    data = app.projections.shownTodos().toJS();
  }

  var todo = container.selectAll('.todo')
    .data(data, function(d) { return d.id; });

  var newTodo = todo.enter().append('p')
    .attr('class', 'todo');
  newTodo.append('input')
    .attr('class', 'todoCompleted')
    .attr('type', 'checkbox')
    .on('change', function(d) { app.actions.toggle(d.id); });
  newTodo.append('span').text(' ');
  newTodo.append('span').attr('class', 'todoTitle');
  newTodo.append('span').text(' ');
  newTodo.append('button')
    .text('Delete')
    .on('click', function(d) { app.actions.destroy(d.id); });

  todo.select('.todoTitle').text(function(d) { return d.title; });
  todo.select('.todoCompleted')
    .property('checked', function(d) { return d.completed; });

  todo.exit().remove();
}

module.exports = {
  create: create,
  render: render,
  destroy: destroy
};
