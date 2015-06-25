var supertest = require('supertest');
var app = require('../app');
var agent = supertest.agent(app);

var User = require('./user/user.model');
var async = require('async');
var _ = require('lodash');

// creates all users in mock and authenticates them
exports.initUsers = function(callback){
  var users = require('./mock-user');
  User.remove({}, function(){
    async.mapSeries(users, function(user, cb) {
    initUser(user, cb);
  }, function(err, results){
      if (!err) {
        var x = {};
        _(results).each(function(result){ x[result.role] = result; });
        callback(x);
      }
    });
  });
};

// creates a single user and authenticates it
function initUser(fixture, cb){
  User.create(fixture, function(err, user){
    if (err){ cb(err); }
    fixture.id = user._id;
    agent
      .post('/auth/local')
      .send({username: fixture.username, password: fixture.password})
      .end(function(err, result){
        fixture.token = result.body.token;
        cb(null, fixture);
      });
  });
}

// deletes all users
exports.clearUsers = function(callback){
  User.remove({},function(){
    if (callback) { callback(); }
  });
};