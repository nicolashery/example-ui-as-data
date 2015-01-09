var React = require('react');

var apps = {
  game: {
    react: null,
    d3: null
  },
  todo: {
    react: require('./todo/react/App.jsx'),
    d3: require('./todo/d3/App.jsx')
  }
};

var Main = React.createClass({
  getInitialState: function() {
    return {
      app: 'game',
      engine: 'react'
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
      <div>
        <p>
          <strong>App: </strong>
          <a
            className={this.state.app === 'game' ? 'isActive' : null}
            href=""
            onClick={this.handleSwitchApp.bind(null, 'game')}>
            Game
          </a>
          {' - '}
          <a
            className={this.state.app === 'todo' ? 'isActive' : null}
            href=""
            onClick={this.handleSwitchApp.bind(null, 'todo')}>
            Todo
          </a>
        </p>
        <p>
          <strong>Rendering engine: </strong>
          <a
            className={this.state.engine === 'react' ? 'isActive' : null}
            href=""
            onClick={this.handleSwitchEngine.bind(null, 'react')}>
            React
          </a>
          {' - '}
          <a
            className={this.state.engine === 'd3' ? 'isActive' : null}
            href=""
            onClick={this.handleSwitchEngine.bind(null, 'd3')}>
            D3.js
          </a>
        </p>
      </div>
    );
  },

  handleSwitchApp: function(name, e) {
    if (e) {
      e.preventDefault();
    }
    this.setState({app: name});
  },

  handleSwitchEngine: function(name, e) {
    if (e) {
      e.preventDefault();
    }
    this.setState({engine: name});
  },

  renderApp: function() {
    var app = this.state.app;
    var engine = this.state.engine;

    var AppComponent = apps[app] && apps[app][engine];

    if (!AppComponent) {
      return <p>App or engine not implemented.</p>;
    }

    return <AppComponent />;
  }
});

module.exports = Main;
