var React = require('react');
var engine = require('./engine');

var App = React.createClass({
  componentDidMount: function() {
    engine.create(this.getDOMNode());
    engine.render();
  },

  componentWillUnmount: function() {
    engine.destroy();
  },

  render: function() {
    return (
      <div></div>
    );
  }
});

module.exports = App;
