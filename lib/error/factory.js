
module.exports = factory

/**
 * Error constructor factory
 * 
 * - Constructors returned from this factory are instances of Error or `parent`.
 * - Members of the `opts` object will become properties of the error instance.
 * - if `opts.stack` is `false`, errors won't have stack traces.
 * 
 * @param {String} name error name
 * @param {Function} parent (optional) parent error constructor
 * @param {Object} opts (optional) options
 * @return {Function} custom error constructor
 */
function factory (name, parent, opts) {
  if ('undefined' == typeof opts && 'function' !== typeof parent) {
    opts = parent;
    parent = undefined;
  }
  parent = parent || Error;
  opts = opts || {};

  var fn = function (message) {
    parent.apply(this, arguments);
    if (false !== opts.stack) Error.captureStackTrace(this, this.constructor);
    for (var opt in opts) {
      if (opts.hasOwnProperty(opt)) this[opt] = opts[opt];
    }
    this.message = message;
  }

  fn.prototype = Object.create(parent.prototype);
  fn.prototype.constructor = fn;
  fn.prototype.name = name;

  return fn;
}
