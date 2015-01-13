var React = require('react');
var app = require('../app');

var UnitList = React.createClass({
  componentDidMount: function() {
    app.addChangeListener(this.handleChange);
  },

  componentWillUnmount: function() {
    app.removeChangeListener(this.handleChange);
  },

  handleChange: function() {
    this.forceUpdate();
  },

  render: function() {
    return (
      <div>
        {this.renderSort()}
        {this.renderReset()}
        {this.renderList()}
      </div>
    );
  },

  renderSort: function() {
    return (
      <p>
        <strong>Sort: </strong>
        <a
          className={app.state().get('sort') === 'cost' ? 'isActive' : null}
          href=""
          onClick={this.handleSort.bind(null, 'cost')}>
          Cost
        </a>
        {' - '}
        <a
          className={app.state().get('sort') === 'name' ? 'isActive' : null}
          href=""
          onClick={this.handleSort.bind(null, 'name')}>
          Name
        </a>
      </p>
    );
  },

  handleSort: function(sort, e) {
    if (e) {
      e.preventDefault();
    }
    app.actions.sort(sort);
  },

  renderReset: function() {
    return <p><button onClick={app.actions.reset}>Reset</button></p>;
  },

  renderList: function() {
    return <div>{app.projections.unitList().map(this.renderUnit).toArray()}</div>;
  },

  renderUnit: function(unit) {
    return (
      <p key={unit.get('id')}>
        <strong>{unit.get('name')}</strong>{' (' + unit.get('count') + ')'}
        {' '}
        <button
          onClick={app.actions.select.bind(null, unit.get('id'))}
          disabled={!unit.get('isSelectable')}
          style={{opacity: unit.get('isSelectable') ? 1 : 0}}>+</button>
        {' '}
        <button
          onClick={app.actions.remove.bind(null, unit.get('id'))}
          disabled={!unit.get('isRemovable')}
          style={{opacity: unit.get('isRemovable') ? 1 : 0}}>-</button>
        <br/>
        {unit.get('description')}<br/>
        {'Cost: ' + unit.get('cost')}<br/>
        {'Attack: ' + unit.get('attack')}<br/>
        {'HP: ' + unit.get('hp')}<br/>
      </p>
    );
  }
});

module.exports = UnitList;
