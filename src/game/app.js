var makeApp = require('../lib/makeApp');
var State = require('./logic/State');
var Actions = require('./logic/Actions');
var Projections = require('./logic/Projections');

var app = makeApp(State, Actions, Projections);
window.gameApp = app;

module.exports = app;
