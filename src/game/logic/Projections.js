var Immutable = require('immutable');
var pipeline = require('../../lib/pipeline');

var Projections = {};

Projections.resourcesRemaining = function(state) {
  var resourcesRemaining = this._resourcesRemainingMap(state);
  return Immutable.fromJS([
    {
      id: 'gold',
      name: 'Gold',
      quantity: resourcesRemaining.get('gold')
    },
    {
      id: 'supply',
      name: 'Supply',
      quantity: resourcesRemaining.get('supply')
    }
  ]);
};

Projections._resourcesRemainingMap = function(state) {
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
  return pipeline(
    this._unitListFromMap.bind(this, state),
    this._unitListSorted.bind(this, state),
    this._unitListFlagged.bind(this, state)
  )();
};

Projections._unitListFromMap = function(state) {
  return state.get('units')
    .map(function(unit, key) {
      return unit.set('id', key);
    })
    .toList();
};

Projections._unitListSorted = function(state, units) {
  var sort = state.get('sort');
  return units.sortBy(function(unit) {
    return unit.get(sort);
  });
};

Projections._unitListFlagged = function(state, units) {
  var resourcesRemaining = this._resourcesRemainingMap(state);
  var goldRemaining = resourcesRemaining.get('gold');
  var supplyRemaining = resourcesRemaining.get('supply');
  return units.map(function(unit) {
    return unit.merge({
      isSelectable: goldRemaining >= unit.get('cost') && supplyRemaining >= 1,
      isRemovable: unit.get('count') > 0
    });
  });
};

Projections.armySummary = function(state) {
  return pipeline(
    this._unitListFromMap.bind(this, state),
    this._unitListSorted.bind(this, state),
    this._unitListSelected,
    this._unitListSummary
  )();
};

Projections._unitListSelected = function(units) {
  return units.filter(function(unit) {
    return unit.get('count') > 0;
  });
};

Projections._unitListSummary = function(units) {
  return units.map(function(unit) {
    return Immutable.Map({
      id: unit.get('id'),
      name: unit.get('name'),
      count: unit.get('count')
    });
  });
};

Projections.armyBalance = function(state) {
  var base = this._totalAttack(state);
  return Immutable.fromJS([
    {
      id: 'light',
      value: this._attackBalance(base, this._totalAttack(state, 'light'))
    },
    {
      id: 'ranged',
      value: this._attackBalance(base, this._totalAttack(state, 'ranged'))
    },
    {
      id: 'cavalry',
      value: this._attackBalance(base, this._totalAttack(state, 'cavalry'))
    }
  ]);
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

Projections._attackBalance = function(base, attack) {
  if (base === 0) {
    return 1;
  }
  return Math.round(attack/base*100)/100;
};

Projections.isShowingArmy = function(state) {
  return this._totalCount(state) > 0;
};

Projections._totalCount = function(state) {
  return state.get('units').reduce(function(result, unit) {
    return result + unit.get('count');
  }, 0);
};

module.exports = Projections;
