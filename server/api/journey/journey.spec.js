'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');
var agent = request.agent();
var Journey = require('./journey.model');
var User = require('../user/user.model');
var Auth = require('../auth-test.helper');

var journey = new Journey({
  name: 'Test Journey',
  description: 'description of a test journey'
});

describe('GET /api/journeys', function() {

  it('should respond with JSON array', function(done) {
    request(app)
      .get('/api/journeys')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Array);
        done();
      });
  });
});

describe('POST /api/journeys', function() {
  var users;
   // before(function (done) {
   //    var testuser;

   //      // this is just to ensure we have a user to log in for your tests
   //      User.findOneAndUpdate(
   //          { email: 'test@test.com' }, 
   //          { email: 'test@test.com', password: 'password' }, 
   //          { upsert: true }, // this will create the user if it doesn't already exist
   //          function(err, doc) {
   //              testuser = doc
   //          }
   //      );

   //      // I assume /simulate-login is not an existing route in your app
   //      app.get('/simulate-login', function(req, res) {
   //          req.login(testuser); // .login is exposed in req by passport
   //      });

   //      // now we simulate login of our testuser and save  the cookies
   //      request(app)
   //          .get('/simulate-login')
   //          .end(function (err, res) {
   //                  if (err) { return done(err); }

   //                  // save cookies
   //                  agent.saveCookies(res);

   //                  done();
   //          });
   //  });

   //  // clean up after ourselves
   //  after(function () {
   //      User.remove({ email: 'test@test.com' }).exec();
   //  });
  before(function(done) {
    Journey.remove().exec().then(function() {
      Auth.initUsers(function(results){
        users = results;
        return done();
      });
    });
  });

  afterEach(function(done) { Journey.remove({}, done); });
  after(function(done) { Auth.clearUsers(done); });

  it('post should fail if unauthorised', function(done) {
    request(app)
      .post('/api/journeys')
      .expect(401)
      .end(function(err, res) {
        done();
      });
  });

  it('should succeed when authenticated', function(done) {
    request(app)
      .get('/api/journeys')
      .set('authorization', 'Bearer ' + users.user.token)
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        return done();
      });
  });

  // it('post should succeed if authorised', function(done) {
  //   request(app)
  //     .post('/api/journeys')
  //     .auth('test@test.com', 'password')
  //     .expect(200)
  //     .end(function(err, res) {
  //       if (err) return done(err);
  //       done();
  //     });
  // });
});