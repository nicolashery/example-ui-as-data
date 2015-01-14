var React = require('react');
var app = require('../app');

var ArmySummary = React.createClass({
  render: function() {
    return (
      <div className="ArmySummary">
        {app.projections.armySummary().map(this.renderUnit).toArray()}
      </div>
    );
  },

  renderUnit: function(unit) {
    return (
      <div
        className={'ArmySummary-unit ArmySummary-unit--' + unit.get('id')}
        key={unit.get('id')}>
        <div className="ArmySummary-icon"></div>
        <div className="ArmySummary-name">{unit.get('name')}</div>
        <div className="ArmySummary-count">{'(' + unit.get('count') + ')'}</div>
      </div>
    );
  }
});

module.exports = ArmySummary;
