const mongoose = require("mongoose");

var groupSchema = new mongoose.Schema({
    groupName: String,
})

groupModel = mongoose.model('group',groupSchema);

module.exports = groupModel
