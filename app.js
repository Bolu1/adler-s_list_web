const express = require('express')
const path = require('path')
// const favicon = require('serve-favicon')
// const logger = require('morgan')
const bodyParser = require('body-parser')
const hbs = require('express-handlebars')

const expressSession = require('express-session')

const routes = require('./ins')
const link = require('./link')

const app = express()

app.engine('hbs', hbs({extname: 'hbs', defaultLayout: false, layoutsDir: __dirname + '/views/'}))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')


// app.use(looger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(expressSession({secret: 'max', saveUninitialized: false, resave:false}))
// app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'css')))
app.use(express.static(path.join(__dirname, 'images')))

app.use('/', routes)

// app.use( function(req, res, next){
//     var err = new Error('Not Found')
//     err.status = 404
//     next(err)
// })
app.listen(3000)