'use strict';

angular.module('toTravelApp')
  .controller('AddJourneyCtrl', function ($scope, journeyFactory) {
    $scope.newJourney = {};

    $scope.createJourney = function() {
      if ($scope.newJourney) {
        journeyFactory.create($scope.newJourney)
          .success(function() {
            $scope.newJourney = {};
          });
      }
    };
  });
