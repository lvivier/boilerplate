
/**
 * Dependencies
 */
var debug = require('debug')('app:http')
  , error = require('debug')('app:error')
  , relative = require('path').relative
  , parse = require('parse-stack')

/**
 * HTTP logger
 */
exports.http = function logger (req, res, next) {
  debug('%s %s', req.method.toLowerCase(), req.url)
  next()
}

/**
 * Error logger
 */
exports.error = function errorLogger (err, req, res, next) {
  if (err.stack) {
    try {
      var frame = parse(err)[0]
      err.callsite = '('
        + relative(process.cwd(), frame.filepath)
        + ':' + frame.lineNumber
        + ':' + frame.columnNumber + ')'
    } catch (e) {}
  }
  error('[%s] %s %s', err.name || 'Error', err.message, err.callsite || '')
  next(err)
}
