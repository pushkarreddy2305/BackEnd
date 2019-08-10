const mongoose  = require("mongoose");

const url       = "mongodb://localhost:27017"
const dbname    = "EmployerHolding"

function connect(){
    mongoose.connect(url+"/"+dbname, {useNewUrlParser:true});

    var db = mongoose.connection

    db.on('error',console.error.bind(console, "connection error: "));
    db.once('open',function(){
        console.log("connected");
    });
}

module.exports = {
    connect,
}

