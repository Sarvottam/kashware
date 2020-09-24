//During the test the env variable is set to test
process.env.NODE_ENV = 'dev';


//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index.js');

let should = chai.should();


chai.use(chaiHttp);
//Our parent block
describe('Thumbnail', () => {

/*
  * Test the /GET route
  */
describe('/get getthumbnail', () => {
    it('it should fail because auth token is not provided ', (done) => {
        chai.request(_server)
            .get('/api/image/getthumbnail')
            .end((err, res) => {
                res.should.have.status(400);
                res.body.message.should.be.eql("You need to be logged in to access this route")
                done();
            }); 
    });

    it('it should fail because url is empty ', (done) => {
        chai.request(_server)
            .get('/api/image/getthumbnail')
            .set("Authorization","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MDA5NDgxODQsImRhdGEiOnsidXNlck5hbWUiOiJzYXJ2b3R0YW1wdGxAZ21haWwuY29tIn0sImlhdCI6MTYwMDg2MTc4NH0.U7OHetorZox1YsaeyamC4Btg55-EXG45MXZ3TkTym-I")
            .end((err, res) => {
                res.should.have.status(400);
                res.body.message.should.be.eql("not a valid Image URl")
                done();
            }); 
    });

    it('it should fail because url is not valid ', (done) => {
        chai.request(_server)
            .get('/api/image/getthumbnail')
            .set("Authorization","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MDA5NDgxODQsImRhdGEiOnsidXNlck5hbWUiOiJzYXJ2b3R0YW1wdGxAZ21haWwuY29tIn0sImlhdCI6MTYwMDg2MTc4NH0.U7OHetorZox1YsaeyamC4Btg55-EXG45MXZ3TkTym-I")
            .send({imageURL:"https://helpx.adobe.com/content/dam/help/en/stock/how-to/visual-reverse-image-search/jcr_content/main-pars/image/visual-reverse-image-search-v2_intro.jp"})
            .end((err, res) => {
                res.should.have.status(400);
                res.body.message.should.be.eql("not a valid Image URl")
                done();
            }); 
    });

    it('it should download thumbnail', (done) => {
        chai.request(_server)
            .get('/api/image/getthumbnail')
            .set("Authorization","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MDA5NDgxODQsImRhdGEiOnsidXNlck5hbWUiOiJzYXJ2b3R0YW1wdGxAZ21haWwuY29tIn0sImlhdCI6MTYwMDg2MTc4NH0.U7OHetorZox1YsaeyamC4Btg55-EXG45MXZ3TkTym-I")
            .send({imageURL:"https://helpx.adobe.com/content/dam/help/en/stock/how-to/visual-reverse-image-search/jcr_content/main-pars/image/visual-reverse-image-search-v2_intro.jpg"})
            .end((err, res) => {
                res.should.have.status(200);
                done();
            }); 
    });

});
})