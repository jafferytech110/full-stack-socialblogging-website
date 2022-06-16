const validator = require('validator')
const userCollection = require('../db').db().collection("users")
const bcrypt = require('bcryptjs')

let User = function ({username, email, password}) {
        this.username = username
        this.email = email
        this.password = password
        this.errors = []
}

User.prototype.cleanUp = function () {
    if(typeof(this.username) != "string") {
        this.username = ""
    }
    if(typeof(this.email) != "string") {
        this.email = ""
    }
    if(typeof(this.password) != "string") {
        this.password = ""
    }
    this.username.trim().toLowerCase()
    this.email.trim().toLowerCase()
}


User.prototype.validate = function () {
    if(this.username == "") {
        this.errors.push("you must provide a username")
    }
    if(this.username != "" && !validator.isAlphanumeric(this.username)) {
        this.errors.push("username can only contain letters and numbers.")
    }
    if(!validator.isEmail(this.email)) {
        this.errors.push("you must provide a valid email")
    }
    if(this.password == "") {
        this.errors.push("you must provide a password")
    }
    if(this.password.length < 12) {
        this.errors.push("password must be at least 12 characters")
    }
    if(this.password.length > 30) {
        this.errors.push("password must be at most 30 characters")
    }
}

User.prototype.register = function () {
    // step 1: validating user data
    this.cleanUp()
    this.validate()

    // step 2: saving data in DB
    if(!this.errors.length){
        // hashing password
        let salt = bcrypt.genSaltSync(10)
        this.password = bcrypt.hashSync(this.password, salt)
        userCollection.insertOne({username: this.username, email: this.email, password:this.password})
    }
}


User.prototype.login = function () {
    return new Promise((resolve,reject) => {
        this.cleanUp()
        userCollection.findOne({username: this.username}).then((foundUser)=>{
            if(foundUser && bcrypt.compareSync(this.password, foundUser.password)){
                resolve("logged in")
            }else{  
                reject("invalid username or password")
            }
        }).catch(()=>{
            reject("please try again later, server is down.")
        })
    })
}


module.exports = User