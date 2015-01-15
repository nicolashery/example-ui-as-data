var app = require('../app');

var RECT_HEIGHT = 20;
var RECT_MARGIN = 5;

function renderArmyBalance(selection) {
  var data = app.projections.armyBalance().toJS();

  var container = selection.selectAll('svg')
    .data([0]);
  container.enter().append('svg')
    .attr('width', 200)
    .attr('height', (RECT_HEIGHT + RECT_MARGIN)*data.length);

  var item = container.selectAll('.js-Item')
    .data(data, function(d) { return d.id; })
    .order();

  var enter = item.enter().append('g').attr('class', 'js-Item');
  enter.append('text')
    .attr('class', 'ArmyBalance-text')
    .attr('x', 0)
    .attr('y', function(d, i) { return yScale(i); })
    .attr('dy', 15)
    .text(function(d) { return 'vs ' + d.id; });
  enter.append('rect')
    .attr('class', 'ArmyBalance-rect')
    .attr('height', RECT_HEIGHT)
    .attr('x', 70)
    .attr('y', function(d, i) { return yScale(i); });

  item.select('rect').attr('width', function(d) { return xScale(d.value); });

  item.exit().remove();
}

function xScale(x) {
  return x*100 - 50;
}

function yScale(y) {
  return y*(RECT_HEIGHT + RECT_MARGIN);
}

module.exports = renderArmyBalance;
