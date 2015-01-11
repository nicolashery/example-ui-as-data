var slice = Array.prototype.slice;

module.exports = function() {
  var functions = slice.call(arguments);

  return function() {
    var args = slice.call(arguments);
    var func;

    for (var i = 0; i < functions.length; i++) {
      func = functions[i];
      args = [func.apply(null, args)];
    }

    return args[0];
  };
};
