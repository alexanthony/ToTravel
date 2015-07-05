'use strict';

var _ = require('lodash');
var Journey = require('./journey.model');

// Get list of journeys
exports.index = function(req, res) {
  Journey.find()
  .populate('createdBy', 'name')
  .exec(function (err, journeys) {
    if(err) { return handleError(res, err); }
    return res.json(200, journeys);
  });
};

// Get a single journey
exports.show = function(req, res) {
  Journey.findById(req.params.id)
  .populate('createdBy', 'name')
  .populate('comments.commentBy', 'name')
  .exec(function (err, journey) {
    if(err) { return handleError(res, err); }
    if(!journey) { return res.send(404); }
    return res.json(journey);
  });
};

// Creates a new journey in the DB.
exports.create = function(req, res) {
  var journey = new Journey(_.merge({ createdBy: req.user._id }, req.body));
  journey.save(function(err, journey) {
    if(err) { return handleError(res, err); }
    return res.json(201, journey);
  });
};

// Updates an existing journey in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Journey.findById(req.params.id)
  .populate('createdBy', 'name')
  .populate('comments.commentBy', 'name')
  .exec(function (err, journey) {
    if (err) { return handleError(res, err); }
    if(!journey) { return res.send(404); }
    var updated = _.merge(journey, req.body);
    updated.transportationAndRatings = req.body.transportationAndRatings;
    updated.comments = req.body.comments;
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, updated);
    });
  });
};

// Deletes a journey from the DB.
exports.destroy = function(req, res) {
  Journey.findById(req.params.id, function (err, journey) {
    if(err) { return handleError(res, err); }
    if(!journey) { return res.send(404); }
    journey.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}