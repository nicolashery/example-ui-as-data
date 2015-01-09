var React = require('react');

var Footer = React.createClass({
  propTypes: {
    count: React.PropTypes.number.isRequired,
    completedCount: React.PropTypes.number.isRequired,
    nowShowing: React.PropTypes.string.isRequired,
    showingClearCompleted: React.PropTypes.bool.isRequired,
    onShow: React.PropTypes.func.isRequired,
    onClearCompleted: React.PropTypes.func.isRequired
  },

  render: function() {
    return (
      <p>
        {this.renderCount()}
        <br/>
        {this.renderFilters()}
        <br/>
        {this.renderClear()}
      </p>
    );
  },

  renderCount: function() {
    return <span><strong>{this.props.count}</strong>{' item(s) left'}</span>;
  },

  renderFilters: function() {
    return (
      <span>
        {this.renderFilter('all', 'All')}
        {' '}
        {this.renderFilter('active', 'Active')}
        {' '}
        {this.renderFilter('completed', 'Completed')}
      </span>
    );
  },

  renderFilter: function(name, label) {
    var classes;
    if (this.props.nowShowing === name) {
      classes = 'isActive';
    }
    var self = this;
    var handleClick = function(e) {
      e.preventDefault();
      self.props.onShow(name);
    };
    return <a className={classes} href="" onClick={handleClick}>{label}</a>;
  },

  renderClear: function() {
    if (!this.props.showingClearCompleted) {
      return null;
    }
    return (
      <a href="" onClick={this.handleClearCompleted}>
        {'Clear completed (' + this.props.completedCount + ')'}
      </a>
    );
  },

  handleClearCompleted: function(e) {
    e.preventDefault();
    this.props.onClearCompleted();
  }
});

module.exports = Footer;
