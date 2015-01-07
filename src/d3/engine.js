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
  renderToggleAll();
  renderTodos();
}

function renderNewTodo() {
  var container = d3.select(el).selectAll('.newTodo')
    .data([0]);

  var enter = container.enter().append('p').attr('class', 'newTodo');
  enter.append('strong').text('New todo: ');
  enter.append('input')
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

function renderToggleAll() {
  var container = d3.select(el).selectAll('.toggleAll')
    .data([0]);

  var enter = container.enter().append('p').attr('class', 'toggleAll');
  enter.append('input')
    .attr('class', 'allCompleted')
    .attr('type', 'checkbox')
    .on('change', function() {
      var checked = app.projections.isToggleAllChecked();
      app.actions.toggleAll(!checked);
    });
  enter.append('span').text(' Toggle all');

  container.style('display', function() {
    return app.projections.isShowingTodoList() ? 'block' : 'none';
  });
  container.select('.allCompleted')
    .property('checked', function() {
      return app.projections.isToggleAllChecked();
    });
}

function renderTodos() {
  var container = d3.select(el).selectAll('.todos')
    .data([0]);
  container.enter().append('div').attr('class', 'todos');

  container.style('display', function() {
    return app.projections.isShowingTodoList() ? 'block' : 'none';
  });

  var data;
  if (!app.projections.isShowingTodoList()) {
    data = [];
  }
  else {
    data = app.projections.shownTodos().toJS();
  }

  var todo = container.selectAll('.todo')
    .data(data, function(d) { return d.id; });

  var enter = todo.enter().append('p')
    .attr('class', 'todo');
  enter.append('input')
    .attr('class', 'todoCompleted')
    .attr('type', 'checkbox')
    .on('change', function(d) { app.actions.toggle(d.id); });
  enter.append('span').text(' ');
  enter.append('span').attr('class', 'todoTitle');
  enter.append('span').text(' ');
  enter.append('button')
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
