var app = require('../app');

function renderUnitList(selection) {
  renderControls(selection);
  renderList(selection);
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

function renderList(selection) {
  var container = selection.selectAll('.js-List')
    .data([0]);
  container.enter().append('div').attr('class', 'js-List');

  var data = app.projections.unitList().toJS();

  var unit = container.selectAll('.js-Unit')
    .data(data, function(d) { return d.id; })
    .order();

  var enter = unit.enter().append('div').attr('class', function(d) {
    return 'js-Unit UnitList-unit UnitList-unit--' + d.id;
  });
  enter.append('div').attr('class', 'UnitList-info').html(function(d) {
    return (
      '<div class="UnitList-icon"></div>' +
      '<div class="UnitList-properties">' +
        '<div class="UnitList-name">' + d.name + '</div>' +
        '<div class="UnitList-description">' + d.description + '</div>' +
        '<div class="UnitList-quantity">' +
          '<span>Cost: </span><strong>' + d.cost + '</strong>' +
        '</div>' +
        '<div class="UnitList-quantity">' +
          '<span>Attack: </span><strong>' + d.attack + '</strong>' +
        '</div>' +
        '<div class="UnitList-quantity">' +
          '<span>HP: </span><strong>' + d.hp + '</strong>' +
        '</div>' +
      '</div>'
    );
  });
  var actions = enter.append('div').attr('class', 'UnitList-actions');
  actions.append('span')
    .attr('class', 'js-Count UnitList-count');
  actions.append('button')
    .attr('class', 'js-Select Button UnitList-button')
    .text('+')
    .on('click', function(d) { app.actions.select(d.id); });
  actions.append('button')
    .attr('class', 'js-Remove Button UnitList-button')
    .text('-')
    .on('click', function(d) { app.actions.remove(d.id); });

  unit.select('.js-Count')
    .style('opacity', function(d) { return d.count ? 1 : 0; })
    .text(function(d) { return '(' + d.count + ')'; });
  unit.select('.js-Select')
    .property('disabled', function(d) { return !d.isSelectable; })
    .style('opacity', function(d) { return d.isSelectable ? 1 : 0; });
  unit.select('.js-Remove')
    .property('disabled', function(d) { return !d.isRemovable; })
    .style('opacity', function(d) { return d.isRemovable ? 1 : 0; });

  unit.exit().remove();
}

module.exports = renderUnitList;
