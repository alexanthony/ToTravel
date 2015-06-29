'use strict';

angular.module('toTravelApp')
  .controller('MainCtrl', function ($scope, journeyFactory) {
    journeyFactory.getJourneys()
      .success(function(data) {
        $scope.journeyList = data;
      })
      .error(function(data) {
        console.log('Error: ' + data);
      });
  });
