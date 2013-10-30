
/**
 * Dependencies
 */
var debug = require('debug')('app:temp')
var relative = require('path').relative
var join = require('path').join
var mkdirp = require('mkdirp')
var rimraf = require('rimraf')

/**
 * Create and clean up temp directory
 */
module.exports = function temp (tmp) {
  // must be an absolute path
  if ('/' !== tmp.charAt(0))
    tmp = join(process.cwd(), tmp)

  mkdirp.sync(tmp)
  debug('using \'%s\'', relative(process.cwd(), tmp))
  process.on('exit', cleanup)

  function cleanup () {
    debug('cleaning up')
    rimraf.sync(tmp)
  }
}
