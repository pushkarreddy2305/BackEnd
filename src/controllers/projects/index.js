"use strict";
const { Project } = require("../../models");

let command = {
    name:'TestCommand',
    args:["this is an arg"],
};

function create(name, description) {
  var newProj = new Project({
    name,
    description
  });
  newProj.save();
  return newProj;
};

function remove(id) {
  return Project.deleteOne({ _id: id})
}

function index() {
  return Project.find().exec();
}

function search(search) {
  var regex = new RegExp(search, "i");
  return Project
    .find({
      $or: [{ description: regex }, { name: regex }]
    })
    .exec();
}

function read(id) {
  return Project.findOne({ _id: id }).exec();
}

async function update(id, name, description) {
  return await Project
    .findOne({ _id: id })
    .exec()
    .then(proj => {
      proj.name = name;
      proj.description = description;
      return proj.save();
    })
    .catch(err => {
        //console.log("edit error:", err);
      reject(err);
    });
}

async function del(id){
    return await Project
        .deleteOne({_id:id})
        .then(result=>{
            if(result.deletedCount > 0){
                return(true);
            }else{
                return Promise.reject(new Error("id not found"))
            }
        });
}

module.exports = {
    index,
    create,
    read,
    update,
    del,
    remove
};
