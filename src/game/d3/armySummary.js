var app = require('../app');

function renderArmySummary(selection) {
  var data = app.projections.armySummary().toJS();

  var unit = selection.selectAll('.js-Unit')
    .data(data, function(d) { return d.id; })
    .order();

  var enter = unit.enter().append('div')
    .attr('class', function(d) {
      return 'js-Unit ArmySummary-unit ArmySummary-unit--' + d.id;
    });
  enter.append('div').attr('class', 'ArmySummary-icon');
  enter.append('div')
    .attr('class', 'ArmySummary-name')
    .text(function(d) { return d.name; });
  enter.append('div').attr('class', 'js-Count ArmySummary-count');

  unit.select('.js-Count').text(function(d) { return '(' + d.count + ')'; });

  unit.exit().remove();
}

module.exports = renderArmySummary;
