const mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
    ldapId:{
        type:String,
        required:true,
    },
    username:String,
    password:String,
})

var user = mongoose.model('user',userSchema);

module.exports = user

//userModel.find(function(err,users){
//    if(err){console.log(err)}
//    console.log(users);
//})
//
