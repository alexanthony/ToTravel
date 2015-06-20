'use strict';

angular.module('toTravelApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('addJourney', {
        url: '/addJourney',
        templateUrl: 'app/addJourney/addJourney.html',
        controller: 'AddJourneyCtrl',
        authenticate: true
      });
  });