
/**
 * Dependencies
 */
var formatError = require('log').formatError
  , error = require('debug')('app:error')
  , debug = require('debug')('app')
  , temp = require('./temp')
  , app = require('app')

/**
 * Bootstrap Application
 */
app.set('port', process.env.PORT || 3000)
   .listen(app.get('port'), listen)

// cleanup temp folder
temp(app.get('temp'))

// signal handlers
process.on('SIGTERM', quit)
process.on('SIGINT',  quit)
process.on('uncaughtException', die)

function listen () {
  debug('listening on port %d', app.get('port'))
}

function quit () {
  debug('quitting')
  process.exit(0)
}

function die (err) {
  error(formatError(err))
  debug('uncaught exception, quitting')
  process.exit(1)
}
