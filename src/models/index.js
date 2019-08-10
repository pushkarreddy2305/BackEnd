const mongoose = require('mongoose');
var passwordHash = require('password-hash');

const Schema = mongoose.Schema;


// -------user admin stuff

const userModel = new Schema({
    schemaType: {type: String },
    username: { type: String },
    sso: { type: String },
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String },
    created: { type: Date },
    lastSeen: { type: Date },
    authToken: { type: String },
    moduleRoles: [{
      type: Schema.Types.ObjectId,
      ref: 'userRoleModule'
    }]
});

const roleModel = new Schema({
    schemaType: { type: String },
    roleName: { type: String }
});

const userModuleRoleModel = new Schema ({
    schemaType: { type: String },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
      },
      module: {
          type: Schema.Types.ObjectId,
          ref: 'module'
      },
      role: {
          type: Schema.Types.ObjectId,
          ref: 'role'
      }
})

const modulePermissionModel = new Schema({
    schemaType: { type: String },
    moduleName: { type: String},
    permissionLevel: {

    }
})

const permissionLevelModel = new Schema({
    schemaType: { type: String},
    levelName: { type: String },
    canCreate: { type: Boolean },
    canDelete: { type: Boolean },
    canUpdate: { type: Boolean }
})

//---- objects

const projectModel = new Schema({
      schemaType: {type: String },
      projectName: {type: String },
      components: [{
        type: Schema.Types.ObjectId,
        ref: 'component'
      }],
      templates: [{
        type: Schema.Types.ObjectId,
        ref: 'template'
      }]
})

const componentModel = new Schema({
      schemaType: {type: String },
      componentName: { type: String },
      jobs: [{
        type: Schema.Types.ObjectId,
        ref: 'job'
      }],
      templates: [{
        type: Schema.Types.ObjectId,
        ref: 'template'
      }]
})

const jobModel = new Schema({
      schemaType: {type: String },
      componentName: { type: String },
      templates: [{
        type: Schema.Types.ObjectId,
        ref: 'template'
      }],
})

const templateModel = new Schema({
      schemaType: {type: String },
      templateName: {type: String},
      templateType: {
        type: Schema.Types.ObjectId,
        ref: 'templateType'
      }
})

const templateType = new Schema({
      schemaType: { type: String },
      typeName: { type: String }
})

var providerModel = new mongoose.Schema({
    label:{
        type:String,
        required:true,
        unique:true,
    },
    location:{
        type:String,
        required:true,
    },
    credentials:{
        type:Schema.Types.Mixed,
        required:true,
    },
    type:String,
});

let dataClient = {} ;
dataClient.User = mongoose.model('user',userModel);
dataClient.Role = mongoose.model('role',roleModel);
dataClient.UserModuleRole = mongoose.model('userModuleRole',userModuleRoleModel);
dataClient.ModulePermission = mongoose.model('modulePermission',modulePermissionModel);
dataClient.PermissionLevel = mongoose.model('permissionLevel',permissionLevelModel);

dataClient.Project = mongoose.model('project',projectModel);
dataClient.Component = mongoose.model('component',componentModel);
dataClient.Job = mongoose.model('job',jobModel);
dataClient.Template = mongoose.model('template',templateModel);
dataClient.TemplateType = mongoose.model('templateType',templateModel);
dataClient.Provider = mongoose.model('provider',providerModel);
module.exports = dataClient;


