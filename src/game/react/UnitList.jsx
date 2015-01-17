var React = require('react');
var cx = require('react/lib/cx');
var app = require('../app');

var UnitList = React.createClass({
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
      <div
        className={'UnitList-unit UnitList-unit--' + unit.get('id')}
        key={unit.get('id')}>
        <div className="UnitList-info">
          <div className="UnitList-icon"></div>
          <div className="UnitList-properties">
            <div className="UnitList-name">{unit.get('name')}</div>
            <div className="UnitList-description">{unit.get('description')}</div>
            <div className="UnitList-quantity">
              {'Cost: '}<strong>{unit.get('cost')}</strong>
            </div>
            <div className="UnitList-quantity">
              {'Attack: '}<strong>{unit.get('attack')}</strong>
            </div>
            <div className="UnitList-quantity">
              {'HP: '}<strong>{unit.get('hp')}</strong>
            </div>
          </div>
        </div>
        <div className="UnitList-actions">
          <span
            className="UnitList-count"
            style={{opacity: unit.get('count') ? 1 : 0}}>
            {' (' + unit.get('count') + ')'}
          </span>
          <button
            className="Button UnitList-button"
            onClick={app.actions.select.bind(null, unit.get('id'))}
            disabled={!unit.get('isSelectable')}
            style={{opacity: unit.get('isSelectable') ? 1 : 0}}>+</button>
            {' '}
          <button
            className="Button UnitList-button"
            onClick={app.actions.remove.bind(null, unit.get('id'))}
            disabled={!unit.get('isRemovable')}
            style={{opacity: unit.get('isRemovable') ? 1 : 0}}>-</button>
        </div>
      </div>
    );
  }
});

module.exports = UnitList;
