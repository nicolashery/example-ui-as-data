var React = require('react');
var app = require('../app');

var Resources = React.createClass({
  render: function() {
    return (
      <div className="Resources">
        {app.projections.resourcesRemaining().map(this.renderItem).toArray()}
      </div>
    );
  },

  renderItem: function(item) {
    return (
      <div
        key={item.get('id')}
        className={'Resources-item Resources-item--' + item.get('id')}>
        <div className="Resources-icon" title={item.get('name')}></div>
        <div className="Resources-quantity">{item.get('quantity')}</div>
      </div>
    );
  }
});

module.exports = Resources;
