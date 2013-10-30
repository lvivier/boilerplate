
/**
 * Dependencies
 */
var express = require('express')
  , build = require('build')
  , error = require('error')
  , log = require('log')

// TODO move a bunch of shit to app
var temp = require('app/temp')

/**
 * Application
 */
var app = module.exports = express()

app.set('public', 'tmp/public')
   .set('temp', 'tmp')
   .set('view engine', 'jade')
   .set('views', __dirname)

// temp folder
temp(app.get('temp'))

app.use(log.http)
   .use(express.compress())
   .use('/app', build('/app', app.get('public')))
   .use('/app', express.static(app.get('public')))
   .use(app.router)
   .use(error.notFound)
   .use(log.error)
   .use(error.response)

app.get('/', function (req, res) { res.render('index') })
