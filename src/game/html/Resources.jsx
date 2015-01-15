var React = require('react');
var app = require('../app');

var Resources = React.createClass({
  render: function() {
    return (
      <p>
        {app.projections.resourcesRemaining().map(this.renderItem).toArray()}
      </p>
    );
  },

  renderItem: function(item) {
    return (
      <span key={item.get('id')}>
        <strong>{item.get('quantity')}</strong>
        {' ' + item.get('name') + ' '}
      </span>
    );
  }
});

module.exports = Resources;
