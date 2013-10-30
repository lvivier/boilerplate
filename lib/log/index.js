
/**
 * Dependencies
 */
var debug = require('debug')('app:http')
  , error = require('debug')('app:error')
  , relative = require('path').relative
  , format = require('util').format
  , parse = require('parse-stack')

/**
 * HTTP logging middleware
 */
exports.http = function logger (req, res, next) {
  debug('%s %s', req.method.toLowerCase(), req.url)
  next()
}

/**
 * Error logging middleware
 */
exports.error = function errorLogger (err, req, res, next) {
  error(formatError(err))
  next(err)
}

exports.formatError = formatError

/**
 * A cool way to format errors for the console
 */
function formatError (err) {
  if (err.stack) {
    try {
      var frame = parse(err)[0]
      err.callsite = '('
        + relative(process.cwd(), frame.filepath)
        + ':' + frame.lineNumber
        + ':' + frame.columnNumber + ')'
    } catch (e) {}
  }
  return format('[%s] %s %s', err.name || 'Error', err.message, err.callsite || '')
}
