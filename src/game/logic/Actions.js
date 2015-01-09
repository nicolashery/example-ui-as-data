var Actions = {};

Actions.select = function(state, unit) {
  return state.updateIn(['units', unit, 'count'], 0, function(count) {
    return count + 1;
  });
};

Actions.remove = function(state, unit) {
  return state.updateIn(['units', unit, 'count'], 0, function(count) {
    return count - 1;
  });
};

Actions.reset = function(state) {
  return state.update('units', function(units) {
    return units.map(function(unit) {
      return unit.set('count', 0);
    });
  });
};

Actions.sort = function(state, sort) {
  return state.set('sort', sort);
};

module.exports = Actions;
