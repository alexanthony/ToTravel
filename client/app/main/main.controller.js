'use strict';

angular.module('toTravelApp')
  .controller('MainCtrl', function ($scope, journeyFactory) {
    journeyFactory.get()
      .success(function(data) {
        $scope.journeyList = data;
      })
      .error(function(data) {
        console.log('Error: ' + data);
      });
  });
