var Immutable = require('immutable');
var Projections = require('../src/game/logic/Projections');

describe('Projections', function() {

  describe('resourcesRemaining', function() {
    it('returns correct remaining gold and supply quantities', function() {
      var state = Immutable.fromJS({
        resources: {gold: 10, supply: 4},
        units: {
          footman: {cost: 1, count: 1},
          archer: {cost: 3, count: 2}
        }
      });

      var resourcesRemaining = Projections.resourcesRemaining(state);

      expect(resourcesRemaining.getIn([0, 'id'])).to.equal('gold');
      expect(resourcesRemaining.getIn([0, 'quantity'])).to.equal(3);
      expect(resourcesRemaining.getIn([1, 'id'])).to.equal('supply');
      expect(resourcesRemaining.getIn([1, 'quantity'])).to.equal(1);
    });
  });

  describe('unitList', function() {
    it('sets isSelectable flag to false if not enough supply', function() {
      var state = Immutable.fromJS({
        resources: {gold: 10, supply: 0},
        units: {
          archer: {cost: 3, count: 2}
        }
      });

      var unitList = Projections.unitList(state);

      expect(unitList.getIn([0, 'isSelectable'])).to.be.false;
    });
  });

});
