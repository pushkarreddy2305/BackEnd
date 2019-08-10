process.env.NODE_ENV = 'test';

const  mongoose = require( 'mongoose');
import {Provider} from "../models/";

const chai = require( 'chai');
const chaiHttp = require( 'chai-http');
import app from '../../server.js';

let should = chai.should;
let expect = chai.expect;


chai.use(chaiHttp);

describe("Test Creation of System",
    () => {
        before((done) => {
            Provider.deleteMany(
                {label:"testProvider"},
                (err,res) => {
                    done();
                }
            )
        });

        it("Should Create a system(or provider) with the label testProvider",
            (done) => {
                chai.request(app)
                    .post('/provider')
                    .send( {
                        label:"testProvider",
                        location:"http://testlocation.com",
                        credentials:{
                            username:"us3rname",
                            password:"p455w0rd",
                        },
                        type:"source control",
                    })
                    .end((err,res) => {
                        expect(err).to.be.null;
                        expect(res).to.have.status(200);
                        expect(res.body).to.have.property('label',"testProvider")
                        expect(res.body).to.have.property('location',"http://testlocation.com")
                        expect(res.body).to.have.property('type',"source control")
                        expect(res.body.credentials).to.have.property('username',"us3rname")
                        expect(res.body.credentials).to.have.property('password',"p455w0rd");
                        done();
                    })
            }
        )

        after((done) => {
            Provider.deleteMany({label:"testProvider"},
                (err,res) => done()
            )
        })
    }
);

describe("Test get system(or provider) with id",
    () => {
        let testProvider;
        before((done) => {
            new Provider(
                {
                    label:"testProvider",
                    location:"http://testlocation.com",
                    credentials:{
                        username:"us3rname",
                        password:"p455w0rd",
                    },
                    type:"source control",
                },
            ).save(
                (err,res)=>{
                    if(err) throw err;
                    testProvider = res;
                    done()
                }
            );
        });

        it("Should find a system(or provider) with the label testProvider",
            (done) => {
                chai.request(app)
                    .get('/provider/'+ testProvider._id)
                    .send()
                    .end((err,res) => {
                        expect(err).to.be.null;
                        expect(res).to.have.status(200);
                        expect(res.body).to.have.property('label',"testProvider")
                        expect(res.body).to.have.property('location',"http://testlocation.com")
                        expect(res.body).to.have.property('type',"source control")
                        expect(res.body.credentials).to.have.property('username',"us3rname")
                        expect(res.body.credentials).to.have.property('password',"p455w0rd");
                        done();
                    })
            }
        )

        after((done) => {
            Provider.deleteMany({label:"testProvider"},
                (err,res) => done()
            )
        })
    }
);

describe("Test update system(or provider) with id",
    () => {
        let testProvider;
        before((done) => {
            new Provider(
                {
                    label:"testProvider",
                    location:"http://testlocation.com",
                    credentials:{
                        username:"us3rname",
                        password:"p455w0rd",
                    },
                    type:"source control",
                }
            ).save(
                (err,res)=>{
                    testProvider = res;
                    done()
                }
            );
        });


        it("Should update a system(or provider) with id",
            (done) => {
                chai.request(app)
                    .put('/provider/'+testProvider._id)
                    .send({
                        label:"newLabel",
                        location:"http://testlocation2.com",
                        type:"documentation",
                        credentials:{
                            username:"newusername",
                            password:"newpassword",
                        }
                    })
                    .end((err,res) => {
                        expect(err).to.be.null;
                        expect(res).to.have.status(200);
                        expect(res.body).to.have.property('label',"newLabel")
                        expect(res.body).to.have.property('location',"http://testlocation2.com")
                        expect(res.body).to.have.property('type',"documentation")
                        expect(res.body.credentials).to.have.property('username',"newusername")
                        expect(res.body.credentials).to.have.property('password',"newpassword");
                        done();
                    })
            }
        )

        it("Should update a system(or provider) with id and only non empty fields",
            (done) => {
                chai.request(app)
                    .put('/provider/'+testProvider._id)
                    .send({
                        label:"",
                        location:"",
                        type:"documentation",
                        credentials:{
                            username:"newusername2",
                            password:"newpassword2",
                        }
                    })
                    .end((err,res) => {
                        expect(err).to.be.null;
                        expect(res).to.have.status(200);
                        expect(res.body).to.have.property('label',"newLabel")
                        expect(res.body).to.have.property('location',"http://testlocation2.com")
                        expect(res.body).to.have.property('type',"documentation")
                        expect(res.body.credentials).to.have.property('username',"newusername2")
                        expect(res.body.credentials).to.have.property('password',"newpassword2");
                        done();
                    })
            }
        )
        after((done) => {
            Provider.deleteMany({_id:testProvider._id},
                (err,res) => done()
            )
        })
    }
);

describe("Test delete system(or provider) with id",
    () => {
        let testProvider;
        before((done) => {
            new Provider(
                {
                    label:"testProvider",
                    location:"http://testlocation.com",
                    credentials:{
                        username:"us3rname",
                        password:"p455w0rd",
                    },
                    type:"source control",
                },
            ).save(
                (err,res)=>{
                    testProvider = res;
                    done()
                }
            );
        });

        it("Should delete a system(or provider) with id",
            (done) => {
                chai.request(app)
                    .delete('/provider/'+testProvider._id)
                    .send()
                    .end((err,res) => {
                        expect(err).to.be.null;
                        expect(res).to.have.status(200);
                        expect(res.body).to.have.property('success',true)
                        done();
                    })
            }
        )

        //        after((done) => {
        //            Provider.deleteMany({label:"testProvider"},
        //                (err,res) => done()
        //            )
        //        })
    }
);

