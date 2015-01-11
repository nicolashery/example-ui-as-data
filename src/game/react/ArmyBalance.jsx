var React = require('react');
var app = require('../app');

var ArmyBalance = React.createClass({
  render: function() {
    var balance = app.projections.armyBalance();
    return (
      <div>
        <p><strong>Balance:</strong></p>
        <ul>
          <li>{'vs light (' + balance.get('light') + ')'}</li>
          <li>{'vs ranged (' + balance.get('ranged') + ')'}</li>
          <li>{'vs cavalry (' + balance.get('cavalry') + ')'}</li>
        </ul>
      </div>
    );
  }
});

module.exports = ArmyBalance;
