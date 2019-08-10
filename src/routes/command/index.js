/*
 * index.js
 * Copyright (C) 2019 brice <brice@US5CD9011ZWN>
 *
 * Distributed under terms of the MIT license.
 */
const router = require('express').Router();
import TestCommand from '../../commandBus/testCommand.js';

router.get('/', function(req, res,next) {
    var t = new TestCommand();
    res.send(t.execute());
});

module.exports=router;
