var app = require('../app');

function renderUnitList(selection) {
  renderControls(selection);
}

function renderControls(selection) {
  var container = selection.selectAll('.js-Controls')
    .data([0]);
  container.enter().append('div').attr('class', 'js-Controls UnitList-controls');

  renderSort(container);
  renderReset(container);
}

function renderSort(selection) {
  var container = selection.selectAll('.js-Sort')
    .data([0]);

  var enter = container.enter().append('div')
    .attr('class', 'js-Sort UnitList-sort');
  enter.append('span').attr('class', 'UnitList-sortItem').text('Sort by');
  enter.append('button')
    .attr('class', 'js-Cost UnitList-sortItem Button')
    .text('Cost')
    .on('click', app.actions.sort.bind(null, 'cost'));
  enter.append('button')
    .attr('class', 'js-Name UnitList-sortItem Button')
    .text('Name')
    .on('click', app.actions.sort.bind(null, 'name'));

  container.select('.js-Cost')
    .classed('is-active', app.state().get('sort') === 'cost');
  container.select('.js-Name')
    .classed('is-active', app.state().get('sort') === 'name');
}

function renderReset(selection) {
  var container = selection.selectAll('.js-Reset')
    .data([0]);

  var enter = container.enter().append('div').attr('class', 'js-Reset');
  enter.append('button')
    .attr('class', 'Button')
    .text('Reset')
    .on('click', app.actions.reset);
}

module.exports = renderUnitList;
