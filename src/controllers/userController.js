'use strict';
const { User } = require("../models");
const query = require("mongoose").query;

function create(username,groups){
    var newUser = new User({
        username,
        groups,
    });
    newUser.save();
    return newUser;
}

function getTest(username) {
    try {
        return {
            'message': 'Logged in as: ' + Username
        };
    } catch (err) {
        return {
            "error": err.message
        };
    }
}

function find(search){
    var regex = new RegExp(search,'i');
    return User.find({username:regex}).exec();
}

function findAll(){
    try{
        return User.find().exec();
    }catch(e){
        console.log("Woah",e.message)
    }
}

module.exports = {
    create,
    getTest,
    find,
    findAll
};
