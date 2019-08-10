const {User} = require("../../models");

function authenticate(username,password){
    let re = new RegExp(username,'i');
    return User.findOne({
        username,
        password,
    })
}

function currentUser(session){
    if(session.hasOwnProperty('user') && session.user != undefined){
        return session.user;
    }
    else return null;

}

module.exports = {
    authenticate,
    currentUser,
}
