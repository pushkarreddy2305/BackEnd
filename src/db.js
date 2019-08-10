const mongoose  = require("mongoose");
// const models    = require('../../data-client/src/client.js');
const url       = "mongodb://localhost:27017"
const dbname    = "EmployerHolding"

function connect(){
    let options = {
        useNewUrlParser:true
    }
    mongoose.connect(url+"/"+dbname,options)

    var db = mongoose.connection

    db.on('error',console.error.bind(console, "connection error: "));
    db.once('open',function(){
                console.log("connected");
    });
}

module.exports = {
    connect,
}

