var State = require('./logic/State');
var Actions = require('./logic/Actions');
var Projections = require('./logic/Projections');

var app = {};

app._State = State;
app._Actions = Actions;
app._Projections = Projections;

app._state = State.initial();

app.state = function() {
  return this._state;
};

app.reset = function() {
  this._state = State.initial();
};

app.actions = {};

Object.keys(Actions).forEach(function(fnName) {
  app.actions[fnName] = function() {
    var args = Array.prototype.slice.call(arguments);
    args.unshift(app._state);
    app._state = Actions[fnName].apply(Actions, args);
    return app._state;
  };
});

app.projections = {};

Object.keys(Projections).forEach(function(fnName) {
  app.projections[fnName] = function() {
    var args = Array.prototype.slice.call(arguments);
    args.unshift(app._state);
    return Projections[fnName].apply(Projections, args);
  };
});

module.exports = app;
