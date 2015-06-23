'use strict';

angular.module('toTravelApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('credits', {
        url: '/credits',
        templateUrl: 'app/credits/credits.html',
        controller: 'CreditsCtrl'
      });
  });