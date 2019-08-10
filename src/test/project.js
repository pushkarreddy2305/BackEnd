/*
 * project.js
 * Copyright (C) 2019 brice <brice@US5CD9011ZWN>
 *
 * Distributed under terms of the MIT license.
 */

process.env.NODE_ENV = 'test';

const  mongoose = require( 'mongoose');

const chai = require( 'chai');
const chaiHttp = require( 'chai-http');
import app from '../../server.js';
let should = chai.should;
let expect = chai.expect;

chai.use(chaiHttp);


