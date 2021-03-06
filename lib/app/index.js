
/**
 * Dependencies
 */
var express = require('express')
  , build = require('build')
  , errors = require('errors')
  , log = require('log')

/**
 * Application
 */
var app = module.exports = express()

app.set('public', 'tmp/public')
   .set('temp', 'tmp')
   .set('view engine', 'jade')
   .set('views', __dirname)

app.use(log.http)
   .use(express.compress())
   .use('/app', build('/app', app.get('public')))
   .use('/app', express.static(app.get('public')))
   .use(app.router)
   .use(errors.notFound)
   .use(log.error)
   .use(errors.response)

app.get('/', function (req, res) { res.render('index') })
