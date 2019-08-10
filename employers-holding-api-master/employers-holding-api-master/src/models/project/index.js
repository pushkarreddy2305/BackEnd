const mongoose = require("mongoose");

var projectSchema = new mongoose.Schema({
    name: String,
    description:String,
})

projectModel = mongoose.model('project',projectSchema);

module.exports = projectModel

