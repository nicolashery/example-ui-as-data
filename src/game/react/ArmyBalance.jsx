var React = require('react');
var app = require('../app');

var RECT_HEIGHT = 20;
var RECT_MARGIN = 5;

var ArmyBalance = React.createClass({
  render: function() {
    var balance = app.projections.armyBalance();
    return (
      <svg width="200" height={(RECT_HEIGHT + RECT_MARGIN)*balance.count()}>
        {balance.map(this.renderItem).toArray()}
      </svg>
    );
  },

  renderItem: function(item, index) {
    return (
      <g key={item.get('id')}>
        <text
          className="ArmyBalance-text"
          x="0"
          y={this.yScale(index)}
          dy="15">
          {'vs ' + item.get('id')}
        </text>
        <rect
          className="ArmyBalance-rect"
          width={this.xScale(item.get('value'))}
          height={RECT_HEIGHT}
          x="70"
          y={this.yScale(index)}>
        </rect>
      </g>
    );
  },

  xScale: function(x) {
    return x*100 - 50;
  },

  yScale: function(y) {
    return y*(RECT_HEIGHT + RECT_MARGIN);
  }
});

module.exports = ArmyBalance;
