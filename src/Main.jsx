var React = require('react');

var ReactApp = require('./react/App.jsx');

var Main = React.createClass({
  getInitialState: function() {
    return {
      renderingEngine: 'react'
    };
  },

  render: function() {
    return (
      <div>
        {this.renderMenu()}
        {this.renderApp()}
      </div>
    );
  },

  renderMenu: function() {
    return (
      <p>
        <strong>Rendering engine: </strong>
        <a href="" onClick={this.handleSwitchRenderingEngine.bind(null, 'react')}>
          React
        </a>
        {' - '}
        <a href="" onClick={this.handleSwitchRenderingEngine.bind(null, 'd3')}>
          D3.js
        </a>
      </p>
    );
  },

  handleSwitchRenderingEngine: function(name, e) {
    if (e) {
      e.preventDefault();
    }
    this.setState({renderingEngine: name});
  },

  renderApp: function() {
    var engine = this.state.renderingEngine;

    if (engine === 'react') {
      return <ReactApp/>;
    }

    return <p>Engine not implemented.</p>;
  }
});

module.exports = Main;
