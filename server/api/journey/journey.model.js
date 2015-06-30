'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var JourneySchema = new Schema({
  name: String,
  createdBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  dateCreated: {type: Date, default: Date.now},
  countries: [String],
  description: String,
  startPoint: {
    lat: Number,
    long: Number
  },
  endPoint: {
    lat: Number,
    long: Number
  },
  otherPointsOnRoute : [
  {
    lat: Number,
    long: Number
  }],
  attractionsOnRoute : [
  {
    lat: Number,
    long: Number,
    title: String,
    description: String,
    addedBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
  }],
  transportationAndRatings: [
  {
    method: {type: String, enum: ['bike', 'walk', 'drive', 'fly', 'train', 'boat']},
    ratings: [{
      rating: {type: Number, min: 1, max: 5}, 
      ratedBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
    }]
  }]  
});

module.exports = mongoose.model('Journey', JourneySchema);