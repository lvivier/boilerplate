
/**
 * Dependencies
 */
var phrases = require('http').STATUS_CODES
  , error = require('error')

/**
 * NotFoundError
 */
exports.NotFoundError = error('NotFoundError', {status:404, stack:false})

/**
 * Not found middleware
 */
exports.notFound = function notFound (req, res, next) {
  var err = new exports.NotFoundError('Resource ' + req.url + ' not found')
  next(err)
}

/**
 * Error handling
 */
exports.response = function errorResponse (err, req, res, next) {
  // defaults
  err.status = err.status || 500
  err.reason = err.reason || phrases[err.status] || 'Internal Server Error'

  res
    .status(err.status)
    .format({
      default: function () {
        res.send(err.message)
      },

      json: function () {
        res.send({reason:err.reason, message:err.message})
      },

      html: function () {
        res.render(__dirname+'/errors.jade', {err:err})
      }
    })
}
