var React = require('react');
var app = require('../app');

var Resources = React.createClass({
  render: function() {
    var resources = app.projections.resourcesRemaining();
    return (
      <div className="Resources">
        <div className="Resources-item Resources-item--gold">
          <div className="Resources-icon" title="Gold"></div>
          <div className="Resources-quantity">{resources.get('gold')}</div>
        </div>
        <div className="Resources-item Resources-item--supply">
          <div className="Resources-icon" title="Supply"></div>
          <div className="Resources-quantity">{resources.get('supply')}</div>
        </div>
      </div>
    );
  }
});

module.exports = Resources;
