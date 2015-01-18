var Immutable = require('immutable');
var Actions = require('../src/game/logic/Actions');

describe('Actions', function() {

  describe('select', function() {
    it('increments count of selected unit', function() {
      var state = Immutable.fromJS({
        units: {archer: {count: 0}}
      });

      state = Actions.select(state, 'archer');

      expect(state.getIn(['units', 'archer', 'count'])).to.equal(1);
    });
  });

});
