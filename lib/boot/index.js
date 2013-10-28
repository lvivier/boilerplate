
/**
 * Dependencies
 */
var express = require('express')
  , build = require('build')
  , error = require('error')
  , log = require('log')

/**
 * Application
 */
var app = module.exports = express()

app.set('public', process.cwd() + '/public')
   .set('view engine', 'jade')
   .set('views', __dirname)

app.use(log.http)
   .use(express.compress())
   .use('/app', build('/app', app.get('public')))
   .use('/app', express.static(app.get('public')))
   .use(app.router)
   .use(error.notFound)
   .use(log.error)
   .use(error.response)

app.get('/', function (req, res) { res.render('index') })
