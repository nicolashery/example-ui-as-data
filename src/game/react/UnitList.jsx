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
      <div className="UnitList">
        <div className="UnitList-controls">
          {this.renderSort()}
          {this.renderReset()}
        </div>
        {this.renderList()}
      </div>
    );
  },

  renderSort: function() {
    return (
      <div className="UnitList-sort">
        <span className="UnitList-sortItem">Sort by</span>
        <button
          className={cx({
            'UnitList-sortItem': true,
            'Button': true,
            'is-active': app.state().get('sort') === 'cost'
          })}
          onClick={app.actions.sort.bind(null, 'cost')}>
          Cost
        </button>
        <button
          className={cx({
            'UnitList-sortItem': true,
            'Button': true,
            'is-active': app.state().get('sort') === 'name'
          })}
          onClick={app.actions.sort.bind(null, 'name')}>
          Name
        </button>
      </div>
    );
  },

  renderReset: function() {
    return (
      <div>
        <button className="Button" onClick={app.actions.reset}>Reset</button>
      </div>
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
