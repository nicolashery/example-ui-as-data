var d3 = require('d3');
var app = require('../app');

function renderResources(el) {
  var container = d3.select(el).select('.js-Resources');
  var data = app.projections.resourcesRemaining().toJS();

  var item = container.selectAll('.js-item')
    .data(data, function(d) { return d.id; });

  var enter = item.enter().append('div')
    .attr('class', function(d) {
      return 'js-item Resources-item Resources-item--' + d.id;
    });
  enter.append('div')
    .attr('class', 'Resources-icon')
    .attr('title', function(d) { return d.name; });
  enter.append('div').attr('class', 'js-quantity Resources-quantity');

  item.select('.js-quantity').text(function(d) { return d.quantity; });

  item.exit().remove();
}

module.exports = renderResources;
