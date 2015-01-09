var Immutable = require('immutable');

var Projections = {};

Projections.resourcesRemaining = function(state) {
  return Immutable.Map({
    gold: state.getIn(['resources', 'gold']) - this._goldSpent(state),
    supply: state.getIn(['resources', 'supply']) - this._supplySpent(state)
  });
};

Projections._goldSpent = function(state) {
  return state.get('units').reduce(function(result, unit) {
    return result + unit.get('count') * unit.get('cost');
  }, 0);
};

Projections._supplySpent = function(state) {
  return state.get('units').reduce(function(result, unit) {
    return result + unit.get('count');
  }, 0);
};

Projections.unitList = function(state) {
  var units = state.get('units')
    .map(function(unit, key) {
      return unit.set('id', key);
    })
    .toList();

  var sort = state.get('sort');
  units = units.sortBy(function(unit) {
    return unit.get(sort);
  });

  var resourcesRemaining = this.resourcesRemaining(state);
  var goldRemaining = resourcesRemaining.get('gold');
  var supplyRemaining = resourcesRemaining.get('supply');
  units = units.map(function(unit) {
    return unit.merge({
      isSelectable: goldRemaining >= unit.get('cost') && supplyRemaining >= 1,
      isRemovable: unit.get('count') > 0
    });
  });

  return units;
};

Projections.armyBalance = function(state) {
  return Immutable.Map({
    base: this._totalAttack(state),
    light: this._totalAttack(state, 'light'),
    ranged: this._totalAttack(state, 'ranged'),
    cavalry: this._totalAttack(state, 'cavalry')
  });
};

Projections._totalAttack = function(state, type) {
  return state.get('units')
    .map(function(unit) {
      var bonus = 0;
      if (type) {
        bonus = unit.getIn(['bonus', type], 0);
      }
      return (unit.get('attack') + bonus) * unit.get('count');
    })
    .reduce(function(result, value) {
      return result + value;
    }, 0);
};

Projections.isShowingSummary = function(state) {
  return this._totalCount(state) > 0;
};

Projections._totalCount = function(state) {
  return state.get('units').reduce(function(result, unit) {
    return result + unit.get('count');
  }, 0);
};

module.exports = Projections;
