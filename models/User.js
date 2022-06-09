const validator = require('validator')

let User = function ({username, email, password}) {
        this.username = username
        this.email = email
        this.password = password
        this.errors = []
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
}

User.prototype.register = function () {
    // step 1: validating user data
    this.validate()

}


module.exports = User