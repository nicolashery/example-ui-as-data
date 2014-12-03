var React = require('react');

var app = require('../app');

var App = React.createClass({
  componentDidMount: function() {
    app.addChangeListener(this.forceUpdate.bind(this));
  },

  componentWillUnmount: function() {
    app.removeChangeListener(this.forceUpdate.bind(this));
  },

  render: function() {
    return (
      <div>
        <p><strong>App state:</strong></p>
        <pre style={{fontSize: '16px'}}>
          {JSON.stringify(app.state(), null, 2)}
        </pre>
      </div>
    );
  }
});

module.exports = App;
