const express = require('express')
const router = require('./router')
const session = require('express-session')
const MongoStore = require('connect-mongo')

const app = express()

//session configuration 
let sessionOptions = session({
    secret: 'Javascript is cool',
    store: MongoStore.create({client:require('./db')}),
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: true,
    }
})

app.use(sessionOptions)

// add user submitted data on req object
app.use(express.urlencoded({extended:false}))
// json sending and receiving activated
app.use(express.json())

app.use(express.static('public'))
// to find templates to render 
app.set('views', 'src')

// template engine like pug, ejs etc as second paramter here
// install ejs from npm
app.set('view engine', 'ejs')

// use router for routing
app.use('/', router)

module.exports = app