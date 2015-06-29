'use strict';

angular.module('toTravelApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('journey', {
        url: '/journey/:journeyID',
        templateUrl: 'app/journey/journey.html',
        controller: 'JourneyCtrl'
      });
  });