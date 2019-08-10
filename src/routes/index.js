var userRouter = require('./user');
var projectRouter = require('./project');
var authRouter = require('./auth');
var statusRouter = require('./project/status.js');
var providerRouter = require('./providers');

module.exports = {
    userRouter,
    projectRouter,
    authRouter,
    statusRouter,
    providerRouter,
}
