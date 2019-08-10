/*
 * jobs.js
 * Copyright (C) 2019 brice <brice@US5CD9011ZWN>
 *
 * Distributed under terms of the MIT license.
 */
import mongoose from "mongoose";

var statusSchema = new mongoose.Schema({
    statusId:{
        type:Number,
        required:true,
    },
    projectId:{
        type:String,
        required:true
    },
    success:{
        type:Boolean,
        required:true,
    },
    result:Object,
});

var status = mongoose.model('status',statusSchema);

module.exports = status;

