var d3 = require('d3');
var app = require('../app');
var renderResources = require('./resources');
var renderArmySummary = require('./armySummary');
var renderArmyBalance = require('./armyBalance');
var renderUnitList = require('./unitList');

var el;

function create(element) {
  el = element;
  app.addChangeListener(render);
}

function destroy() {
  app.removeChangeListener(render);
}

function render() {
  if (!el) {
    throw new Error('Can\'t render without an element');
  }

  var selection = d3.select(el);
  renderGame(selection);
  renderResources(selection.select('.js-Resources'));
  renderArmySummary(selection.select('.js-ArmySummary'));
  renderArmyBalance(selection.select('.js-ArmyBalance'));
  renderUnitList(selection.select('.js-UnitList'));
}

function renderGame(selection) {
  var container = selection.selectAll('.js-Game')
    .data([0]);

  container.enter().append('div').attr('class', 'Game js-Game').html(
    '<div class="Game-panel Game-panel--left">' +
      '<div class="Game-box Game-box--unitList">' +
        '<div class="Game-boxTitle">Unit selection</div>' +
        '<div class="Game-boxContent">' +
          '<div class="UnitList js-UnitList"></div>' +
        '</div>' +
      '</div>' +
    '</div>' +
    '<div class="Game-panel Game-panel--right">' +
      '<div class="Game-box Game-box--resources">' +
        '<div class="Game-boxTitle">Resources</div>' +
        '<div class="Game-boxContent">' +
          '<div class="Resources js-Resources"></div>' +
        '</div>' +
      '</div>' +
      '<div class="js-Army">' +
        '<div class="Game-box Game-box--armySummary">' +
          '<div class="Game-boxTitle">Army summary</div>' +
          '<div class="Game-boxContent">' +
            '<div class="ArmySummary js-ArmySummary"></div>' +
          '</div>' +
        '</div>' +
        '<div class="Game-box Game-box--armyBalance">' +
          '<div class="Game-boxTitle">Army balance</div>' +
          '<div class="Game-boxContent">' +
            '<div class="ArmyBalance js-ArmyBalance"></div>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</div>'
  );

  container.select('.js-Army')
    .style('display', function() {
      return app.projections.isShowingArmy() ? 'block' : 'none';
    });
}

module.exports = {
  create: create,
  render: render,
  destroy: destroy
};
