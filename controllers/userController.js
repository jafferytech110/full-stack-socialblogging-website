const User = require('../models/User')

exports.login = (req,res) => {
    let user = new User(req.body)
    // login is returning a promise
    user.login().then((reply)=>{
        res.send(reply)
    }).catch((err)=>{
        res.send(err)
    })
}

exports.logout = () => {
    
}

exports.register = (req,res) => {
    let user = new User(req.body)
    user.register()
    if (user.errors.length) {
        res.send(user.errors)
    } else {
        res.send('you will be registered soon.')
    }
}

exports.home = (req,res) => {
    res.render('home-guest')
}