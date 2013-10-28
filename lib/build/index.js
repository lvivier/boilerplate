
/**
 * Dependencies
 */
var Builder = require('component-builder')
  , stylus = require('component-stylus-plugin')
  , debug = require('debug')('app:build')
  , write = require('fs').writeFileSync
  , jade = require('component-jade')
  , join = require('path').join
  , mkdirp = require('mkdirp')
  , bytes = require('bytes')

/**
 * Component builder middleware
 */
module.exports = function (prefix, output) {
  mkdirp.sync(output)
  var built = false

  return function builder (req, res, next) {
    if (built) return next()

    var dev = ('development' === req.app.get('env'))

    // build on every request in development
    if (!dev) built = true
    build(prefix, output, dev, next)
  }
}

function build (prefix, output, dev, fn) {
  var builder = new Builder('.')
    , start = new Date()
    , boot = '\nrequire(\'boot\')'

  if (dev) builder.addSourceURLs()
  builder.prefixUrls(prefix)
  builder.copyAssetsTo(output)
  builder
    .use(stylus)
    .use(jade)
    .build(function (err, res) {
      if (err) return fn(err)

      var js = res.require+res.js+boot

      write(join(output, '/app.js'), js)
      write(join(output, '/app.css'), res.css)

      debug('built in %dms', new Date() - start)
      debug('css: %s', bytes(res.css.length))
      debug('js: %s', bytes(js.length))

      fn()
    })
}
