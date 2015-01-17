var Immutable = require('immutable');

var State = {};

State.initial = function() {
  return Immutable.fromJS({
    resources: {gold: 1500, supply: 10},
    sort: 'cost',
    units: {
      footman: {
        count: 0,
        name: 'Footman',
        description: 'Basic infantry unit',
        cost: 120,
        attack: 7,
        hp: 50
      },
      archer: {
        count: 0,
        name: 'Archer',
        description: 'Ranged unit, strong vs light armor',
        cost: 140,
        attack: 5,
        hp: 40,
        bonus: {light: 4}
      },
      pikeman: {
        count: 0,
        name: 'Pikeman',
        description: 'Spear-wielding light infantry, strong vs cavalry',
        cost: 150,
        attack: 5,
        hp: 60,
        bonus: {cavalry: 5}
      },
      knight: {
        count: 0,
        name: 'Knight',
        description: 'Heavy-armored cavalry unit, strong vs ranged',
        cost: 260,
        attack: 12,
        hp: 160,
        bonus: {ranged: 4}
      }
    }
  });
};

module.exports = State;
