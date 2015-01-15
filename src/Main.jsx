var React = require('react');
var cx = require('react/lib/cx');

var apps = {
  game: {
    react: require('./game/react/App.jsx'),
    d3: require('./game/d3/App.jsx'),
    html: require('./game/html/App.jsx')
  },
  todo: {
    react: require('./todo/react/App.jsx'),
    d3: require('./todo/d3/App.jsx'),
    html: require('./todo/react/App.jsx')
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
        {this.renderNavbar()}
        {this.renderApp()}
        {this.renderFooter()}
      </div>
    );
  },

  renderNavbar: function() {
    return (
      <div className="Navbar">
        <div className="Navbar-left">
          <div className="Navbar-group">
            <div className="Navbar-label">App:</div>
            <a
              className={cx({
                'Navbar-link': true,
                'is-active': this.state.app === 'game'
              })}
              href=""
              onClick={this.handleSwitchApp.bind(null, 'game')}>
              Game
            </a>
            <a
              className={cx({
                'Navbar-link': true,
                'is-active': this.state.app === 'todo'
              })}
              href=""
              onClick={this.handleSwitchApp.bind(null, 'todo')}>
              Todo
            </a>
          </div>
          <div className="Navbar-group">
            <div className="Navbar-label">Rendering engine:</div>
            <a
              className={cx({
                'Navbar-link': true,
                'is-active': this.state.engine === 'react'
              })}
              href=""
              onClick={this.handleSwitchEngine.bind(null, 'react')}>
              React
            </a>
            <a
              className={cx({
                'Navbar-link': true,
                'is-active': this.state.engine === 'd3'
              })}
              href=""
              onClick={this.handleSwitchEngine.bind(null, 'd3')}>
              D3.js
            </a>
            <a
              className={cx({
                'Navbar-link': true,
                'is-active': this.state.engine === 'html'
              })}
              href=""
              onClick={this.handleSwitchEngine.bind(null, 'html')}>
              React (HTML)
            </a>
          </div>
        </div>
        <div className="Navbar-right">
          <a
            className="Navbar-link"
            href="https://github.com/nicolashery/example-ui-as-data"
            target="_blank">
            View on Github
          </a>
        </div>
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
  },

  renderFooter: function() {
    if (this.state.app !== 'game' || this.state.engine === 'html') {
      return null;
    }

    return (
      <div className="Footer">
        {'Game art by '}
        <a href="http://7soul1.deviantart.com/" target="_blank">
          {'Henrique Lazarini'}
        </a>
      </div>
    );
  }
});

module.exports = Main;
