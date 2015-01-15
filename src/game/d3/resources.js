var app = require('../app');

function renderResources(selection) {
  var data = app.projections.resourcesRemaining().toJS();

  var item = selection.selectAll('.js-Item')
    .data(data, function(d) { return d.id; });

  var enter = item.enter().append('div')
    .attr('class', function(d) {
      return 'js-Item Resources-item Resources-item--' + d.id;
    });
  enter.append('div')
    .attr('class', 'Resources-icon')
    .attr('title', function(d) { return d.name; });
  enter.append('div').attr('class', 'js-Quantity Resources-quantity');

  item.select('.js-Quantity').text(function(d) { return d.quantity; });

  item.exit().remove();
}

module.exports = renderResources;
