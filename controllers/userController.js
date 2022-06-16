const User = require('../models/User')

exports.login = (req,res) => {
    let user = new User(req.body)
    // login is returning a promise
    user.login().then((reply)=>{
        req.session.user = {username: req.body.username}
        // making sure if the session is saved
        req.session.save(()=>{
            res.redirect('/')
        })
    }).catch((err)=>{
        res.send(err)
    })
}

exports.logout = (req,res) => {
    req.session.destroy(()=>{
        res.redirect('/')
    })
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
    if(req.session.user){
        res.render("home-dashboard", { username: req.session.user.username })
    } else {
        res.render('home-guest')
    }
}