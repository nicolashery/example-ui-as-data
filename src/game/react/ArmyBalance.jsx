var React = require('react');
var app = require('../app');

var RECT_HEIGHT = 20;
var RECT_MARGIN = 5;

var ArmyBalance = React.createClass({
  render: function() {
    var balance = app.projections.armyBalance();
    var self = this;
    return (
      <svg width="200" height={(RECT_HEIGHT + RECT_MARGIN)*balance.count()}>
        {balance.mapEntries(function(entry, index) {
          return [index, self.renderItem(entry[0], entry[1], index)];
        }).toList().toArray()}
      </svg>
    );
  },

  renderItem: function(key, value, index) {
    return (
      <g key={key}>
        <text
          className="ArmyBalance-text"
          x="0"
          y={this.yScale(index)}
          dy="15">
          {'vs ' + key}
        </text>
        <rect
          key={key}
          className="ArmyBalance-rect"
          width={this.xScale(value)}
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
