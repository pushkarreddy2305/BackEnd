"use strict";

const express = require("express");
const bodyParser = require("body-parser");

const {
    userRouter,
    projectRouter,
} = require('./src/routes');

const {connect} = require('./src/db');

connect();

const port = process.env.PORT || 8080;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/', async (req, res) => res.sendStatus(200));

app.all('*', async function (req, res, next) {
    req.app.user = {};

    // if (!req.headers.authorization) {
    //     throw new Error('token not found');
    // }

    // if (req.headers.authorization) {  // user auth
    //     const config = {
    //         headers: {
    //             Authorization: req.headers.authorization
    //         }
    //     };
    // }

    if (req.headers.user === 'user1') {
        req.app.username = 'Adam';
    } else if (req.headers.user === 'user2') {
        req.app.username = 'Bob';
    } else {
        req.app.username = '';
    }

    next();
});

app.use('/user', userRouter);
app.use('/project', projectRouter);

const server = app.listen(port, function () {
    console.log("API running on port ", server.address().port);
});
