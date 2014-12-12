var d3 = window.d3;
var app = require('../app');

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

  renderTodos();
}

function renderTodos() {
  var data;
  if (!app.projections.isShowingTodoList()) {
    data = [];
  }
  else {
    data = app.projections.shownTodos().toJS();
  }

  var todo = d3.select(el).selectAll('.todo')
    .data(data, function(d) { return d.id; });

  todo.enter().append('p')
    .attr('class', 'todo');

  todo.text(function(d) { return d.title; });

  todo.exit().remove();
}

module.exports = {
  create: create,
  render: render,
  destroy: destroy
};
