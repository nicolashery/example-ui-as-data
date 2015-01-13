var React = require('react');
var app = require('../app');

var ArmySummary = React.createClass({
  render: function() {
    return (
      <div>
        <p><strong>Summary:</strong></p>
        <ul>
          {app.projections.armySummary().map(this.renderUnit).toArray()}
        </ul>
      </div>
    );
  },

  renderUnit: function(unit) {
    return (
      <li key={unit.get('id')}>
        {unit.get('name') + ' (' + unit.get('count') + ')'}
      </li>
    );
  }
});

module.exports = ArmySummary;
