var React = require('react');
var app = require('../app');

var ArmyBalance = React.createClass({
  render: function() {
    return (
      <div>
        <p><strong>Balance:</strong></p>
        <ul>
          {app.projections.armyBalance().map(this.renderItem).toArray()}
        </ul>
      </div>
    );
  },

  renderItem: function(item) {
    return (
      <li key={item.get('id')}>
        {'vs ' + item.get('id') + ' (' + item.get('value') + ')'}
      </li>
    );
  }
});

module.exports = ArmyBalance;
