"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const session = require('express-session');
// const models = require('../data-client/src/client.js');
const {statusQueue,jobQueue} = require('./src/jobsQueue/');
import TestCommand from './src/commandBus/testCommand.js';


const {
    userRouter,
    projectRouter,
    authRouter,
    statusRouter,
    providerRouter,
} = require('./src/routes');

const {connect} = require('./src/db');

connect();

const port = process.env.PORT || 8080;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
    secret:"3mpl0y3r",
}));

app.get('/', async (req, res) => res.sendStatus(200));
app.use( (req,res,next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:4200");
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Headers", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    next()
})
app.all(/[^\/auth]/, async function (req, res, next) {
    if(req.session.loggedIn){

    }
    next();
});

app.use('/user', userRouter);
app.use('/project', projectRouter);
app.use('/status', statusRouter);
app.use('/auth',authRouter);
app.use('/provider',providerRouter);

const server = app.listen(port,"localhost", function () {
    console.log("API running on port ", server.address().address,server.address().port);
});


export default app;

