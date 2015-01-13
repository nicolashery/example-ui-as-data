var React = require('react');
var app = require('../app');

var Resources = React.createClass({
  render: function() {
    var resources = app.projections.resourcesRemaining();
    return (
      <p>
        <strong>{resources.get('gold')}</strong>{' Gold'}
        {' '}
        <strong>{resources.get('supply')}</strong>{' Supply'}
      </p>
    );
  }
});

module.exports = Resources;
