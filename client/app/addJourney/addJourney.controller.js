'use strict';

angular.module('toTravelApp')
  .controller('AddJourneyCtrl', function ($scope, journeyFactory) {
    $scope.newJourney = {
      transportationAndRatings: [{
              method: '',
              rating: 1
            }]
    };
    $scope.methods = [
      {id: 'bike',  name: 'Bike', hasFAIcon: true, icon: 'fa-bicycle'},
      {id: 'walk',  name: 'Walk/Trek', hasFAIcon: true, icon: 'fa-compass'},
      {id: 'drive', name: 'Drive', hasFAIcon: true, icon: 'fa-car'},
      {id: 'fly',   name: 'Fly', hasFAIcon: true, icon: 'fa-plane'},
      {id: 'train', name: 'Train', hasFAIcon: true, icon: 'fa-train'},
      {id: 'boat',  name: 'Boat', hasFAIcon: true, icon: 'fa-ship'}
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

    $scope.canAddTransportationMethod = function() {
      return $scope.newJourney.transportationAndRatings.length < $scope.methods.length;
    };

    $scope.addTransportationAndRating = function() {
      $scope.newJourney.transportationAndRatings.push({
        method: '',
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
