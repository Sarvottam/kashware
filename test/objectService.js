//During the test the env variable is set to test
process.env.NODE_ENV = 'dev';


//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index.js');
let should = chai.should();


chai.use(chaiHttp);
//Our parent block
describe('Object Patching ', () => {
    let jwtToken;
    chai.request(_server)
        .post('/api/auth/login')
        .send({ userName: "sarvottamq", password: "1234567890" })
        .end((err, res) => {
            jwtToken = res.body.result.jwtToken
        });

    /*
      * Test the /GET route
      */
    describe('/Patch patchRequest', () => {
        it('it should fail because auth token is not provided ', (done) => {
            chai.request(_server)
                .patch('/api/modify/patchRequest')
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.message.should.be.eql("You need to be logged in to access this route")
                    done();
                });
        });

        it('it should fail because request body is empty ', (done) => {
            chai.request(_server)
                .patch('/api/modify/patchRequest')
                .set("Authorization", jwtToken)
                .end((err, res) => {
                    console.log("", res.body)
                    res.should.have.status(400);
                    res.body.message.should.be.eql("reqObject missing or invalid")
                    done();
                });
        });

        it('it should fail because patchobject is empty ', (done) => {
            chai.request(_server)
                .patch('/api/modify/patchRequest')
                .set("Authorization", jwtToken)
                .send({
                    reqObject: {
                        "name": "Sarvo",
                        "roll": 2
                    }
                })
                .end((err, res) => {
                    console.log("", res.body)
                    res.should.have.status(400);
                    res.body.message.should.be.eql("patchObject missing or invalid")
                    done();
                });
        });

        it('it should add address key-value pair to the object {"name":"Sarvo","roll" :2}', (done) => {
            chai.request(_server)
                .patch('/api/modify/patchRequest')
                .set("Authorization", jwtToken)
                .send({ reqObject: { "name": "Sarvo", "roll": 2 }, "patchObject": [{ "op": "add", "path": "/address", "value": "Mumbai" }] })
                .end((err, res) => {
                    console.log("", res.body)
                    res.should.have.status(200);
                    res.body.result.should.be.eql({ data: { name: 'Sarvo', roll: 2, address: 'Mumbai' } })
                    done();
                });
        });

        it('it should fail while removing address key-value pair to the object as it dont  exist', (done) => {
            chai.request(_server)
                .patch('/api/modify/patchRequest')
                .set("Authorization", jwtToken)
                .send({ reqObject: { "name": "Sarvo", "roll": 2 }, "patchObject": [{ "op": "remove", "path": "/address" }] })
                .end((err, res) => {
                    console.log("", res.body)
                    res.should.have.status(400);
                    res.body.message.should.be.eql("Value at address does not exist")
                    done();
                });
        });


        it('it should  be able to remove roll (key-value) from the object', (done) => {
            chai.request(_server)
                .patch('/api/modify/patchRequest')
                .set("Authorization", jwtToken)
                .send({ reqObject: { "name": "Sarvo", "roll": 2 }, "patchObject": [{ "op": "remove", "path": "/roll" }] })
                .end((err, res) => {
                    console.log("", res.body)
                    res.should.have.status(200);
                    res.body.result.should.be.eql({ data: { name: 'Sarvo' } })
                    done();
                });
        });
    });
})