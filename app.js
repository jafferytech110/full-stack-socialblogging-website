const express = require('express')
const router = require('./router')

const app = express()

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

app.listen(3000)