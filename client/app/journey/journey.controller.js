'use strict';
/*global google */

angular.module('toTravelApp')
  .controller('JourneyCtrl', function ($scope, $stateParams, journeyFactory, uiGmapGoogleMapApi, $q) {
    var journeyPromise = journeyFactory.getJourney($stateParams.journeyID);

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
    var mapsPromise = uiGmapGoogleMapApi;

    $q.all([journeyPromise, mapsPromise]).then(
// success callback
      function(data) {
        $scope.journey = data[0].data;

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
          center: { latitude: $scope.journey.startPoint.lat, longitude: $scope.journey.startPoint.long }, 
          zoom: 8, 
          isOpen : false,
          refresh : false,
          path : [$scope.startMarker, $scope.endMarker],
          pathStroke : {
            color: '#99009f',
            weight: 5
          },
          events : {
            tilesloaded : function(mapModel) {
              $scope.map.bounds = new google.maps.LatLngBounds();
              $scope.map.bounds.extend(new google.maps.LatLng($scope.journey.startPoint.lat, $scope.journey.startPoint.long));
              $scope.map.bounds.extend(new google.maps.LatLng($scope.journey.endPoint.lat, $scope.journey.endPoint.long));
              mapModel.fitBounds($scope.map.bounds);
            }
          }
        };

        for (var i = 0; i < $scope.journey.transportationAndRatings.length; i++) {
          var totalRating = 0;
          for (var j = 0; j < $scope.journey.transportationAndRatings[i].ratings.length; j++) {
            totalRating = totalRating + $scope.journey.transportationAndRatings[i].ratings[j].rating;
          }
          $scope.journey.transportationAndRatings[i].averageRating = totalRating / $scope.journey.transportationAndRatings[i].ratings.length;
        }
    }, 
    // Failure callback
    function(data) {
      console.log('Error: '+data);
    });
  });
