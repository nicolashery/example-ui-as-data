var React = require('react');
var app = require('../app');
var Resources = require('./Resources.jsx');
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
      <div>
        <Resources />
        <UnitList />
      </div>
    );
  }
});

module.exports = App;
