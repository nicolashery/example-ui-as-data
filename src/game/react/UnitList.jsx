var React = require('react');
var cx = require('react/lib/cx');
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
        <button
          className={cx({
            'Button': true,
            'is-active': app.state().get('sort') === 'cost'
          })}
          onClick={app.actions.sort.bind(null, 'cost')}>
          Cost
        </button>
        {' - '}
        <button
          className={cx({
            'Button': true,
            'is-active': app.state().get('sort') === 'name'
          })}
          onClick={app.actions.sort.bind(null, 'name')}>
          Name
        </button>
      </p>
    );
  },

  renderReset: function() {
    return (
      <p>
        <button className="Button" onClick={app.actions.reset}>Reset</button>
      </p>
    );
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
          className="Button"
          onClick={app.actions.select.bind(null, unit.get('id'))}
          disabled={!unit.get('isSelectable')}
          style={{opacity: unit.get('isSelectable') ? 1 : 0}}>+</button>
        {' '}
        <button
          className="Button"
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
