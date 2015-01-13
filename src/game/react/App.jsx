var React = require('react');
var app = require('../app');
var Resources = require('./Resources.jsx');
var ArmySummary = require('./ArmySummary.jsx');
var ArmyBalance = require('./ArmyBalance.jsx');
var UnitList = require('./UnitList.jsx');

var App = React.createClass({
  componentDidMount: function() {
    app.addChangeListener(this.handleChange);
  },

  componentWillUnmount: function() {
    app.removeChangeListener(this.handleChange);
  },

  handleChange: function() {
    this.forceUpdate();
  },

  render: function() {
    return (
      <div className="Game">
        <div className="Game-panel Game-panel--left">
          <div className="Game-box Game-box--unitList">
            <div className="Game-boxTitle">Select units</div>
            <div className="Game-boxContent"><UnitList /></div>
          </div>
        </div>
        <div className="Game-panel Game-panel--right">
          <div className="Game-box Game-box--resources">
            <div className="Game-boxTitle">Resources</div>
            <div className="Game-boxContent"><Resources /></div>
          </div>
          {this.renderArmy()}
        </div>
      </div>
    );
  },

  renderArmy: function() {
    if (!app.projections.isShowingArmy()) {
      return null;
    }

    return (
      <div>
        <div className="Game-box Game-box--armySummary">
          <div className="Game-boxTitle">Army summary</div>
          <div className="Game-boxContent"><ArmySummary /></div>
        </div>
        <div className="Game-box Game-box--armyBalance">
          <div className="Game-boxTitle">Army balance</div>
          <div className="Game-boxContent"><ArmyBalance /></div>
        </div>
      </div>
    );
  }
});

module.exports = App;
