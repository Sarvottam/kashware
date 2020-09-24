// During the test the env variable is set to test
process.env.NODE_ENV = 'dev';

// Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
require('../index.js');

chai.should();

chai.use(chaiHttp);

/*
  * Test the /GET route
  */
describe('/POST login', () => {
  it('it should login user with correct username ', (done) => {
    chai.request(_server)
      .post('/api/auth/login')
      .send({ userName: 'sarvottamq', password: '1234567890' })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.result.should.be.a('object');
        done();
      });
  });

  it('it should fail because of username size exceeding 30 ', (done) => {
    chai.request(_server)
      .post('/api/auth/login')
      .send({ userName: 'sarvottamqwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww', password: '1234567890' })
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it('it should fail as password is not provided ', (done) => {
    chai.request(_server)
      .post('/api/auth/login')
      .send({ userName: 'sarvottamq' })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.message.should.be.eql('password missing or invalid');
        done();
      });
  });
});
