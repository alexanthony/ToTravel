'use strict';

angular.module('toTravelApp')
  .controller('JourneyCtrl', function ($scope, $stateParams, journeyFactory, uiGmapGoogleMapApi) {
    journeyFactory.getJourney($stateParams.journeyID)
      .success(function(data) {
        $scope.journey = data;
      })
      .error(function(data) {
        console.log('Error: ' + data);
      });

    $scope.methods = [
      {id: 'bike',  name: 'Bike', hasFAIcon: true, icon: 'fa-bicycle'},
      {id: 'walk',  name: 'Walk/Trek', hasFAIcon: true, icon: 'fa-compass'},
      {id: 'drive', name: 'Drive', hasFAIcon: true, icon: 'fa-car'},
      {id: 'fly',   name: 'Fly', hasFAIcon: true, icon: 'fa-plane'},
      {id: 'train', name: 'Train', hasFAIcon: true, icon: 'fa-train'},
      {id: 'boat',  name: 'Boat', hasFAIcon: true, icon: 'fa-ship'}
    ];

    $scope.getMethod = function(transportationAndRating) {
      return $scope.methods.filter(function(obj) {
        return obj.id === transportationAndRating.method;
      })[0];
    };


    // Async loading of google maps sdk - stuff in here can reference maps api
    uiGmapGoogleMapApi.then(function(maps) {

      $scope.startMarker = {
        latitude: $scope.journey.startPoint.lat,
        longitude: $scope.journey.startPoint.long,
        id : 0,
        options: {
          draggable: false,
          icon: {
            url: 'assets/images/startMarker.png',
            size: new google.maps.Size(40, 48),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(20, 48)
          }
        }
      };

      $scope.endMarker = {
        latitude: $scope.journey.endPoint.lat,
        longitude: $scope.journey.endPoint.long,
        id : 0,
        options: {
          draggable: false,
          icon: {
            url: 'assets/images/endMarker.png',
            size: new google.maps.Size(40, 48),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(20, 48)
          }
        }
      };

      $scope.map = { 
        center: { latitude: 51.5, longitude: -0.12 }, 
        zoom: 8, 
        isOpen : false,
        refresh : false,
        path : [$scope.startMarker, $scope.endMarker],
        pathStroke : {
          color: '#99009f',
          weight: 5
        }
      };
    });
  });
