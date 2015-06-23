'use strict';

angular.module('toTravelApp')
  .controller('AddJourneyCtrl', function ($scope, journeyFactory) {
    $scope.newJourney = {
      transportationAndRatings: [{
              method: 'fly',
              rating: 1
            }]
    };
    $scope.methods = [
      {id: 'bike',  name: 'Bike'},
      {id: 'walk',  name: 'Walk/Trek'},
      {id: 'drive', name: 'Drive'},
      {id: 'fly',   name: 'Fly'},
      {id: 'train', name: 'Train'},
      {id: 'boat',  name: 'Boat'}
      ];

    $scope.hoveringOver = function(value) {
      $scope.overStar = value;
    };

    $scope.createJourney = function() {
      if ($scope.newJourney) {
        journeyFactory.create($scope.newJourney)
          .success(function() {
            $scope.newJourney = {};
          });
      }
    };

    $scope.canDeleteTransportationMethod = function() {
      return $scope.newJourney.transportationAndRatings.length > 1;
    };

    $scope.addTransportationAndRating = function() {
      $scope.newJourney.transportationAndRatings.push({
        method: 'fly',
        rating: 1
      });
    };

    $scope.deleteTransportationAndRating = function(transportationAndRating) {
      var index = $scope.newJourney.transportationAndRatings.indexOf(transportationAndRating);
      if (index !== -1) {
        $scope.newJourney.transportationAndRatings.splice(index, 1);
      }
    };
  });
