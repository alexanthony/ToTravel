'use strict';

angular.module('toTravelApp')
  .controller('AddJourneyCtrl', function ($scope, journeyFactory, uiGmapGoogleMapApi) {

    $scope.newJourney = {
      transportationAndRatings: [{
              method: '',
              rating: 1
            }],
      startPoint: {
        lat : 0,
        long: 0
      },
      endPoint: {
        lat: 0,
        long: 0
      }
    };

    $scope.alerts = [];

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

    $scope.closeAlert = function(index) {
      $scope.alerts.splice(index, 1);
    };

    $scope.createJourney = function() {
      if ($scope.newJourney) {
        journeyFactory.create($scope.newJourney)
          .success(function() {
            $scope.alerts.push({
              type: 'success',
              message1: 'Journey',
              messageBold: $scope.newJourney.name,
              message2: 'successfully saved.'
            });
            $scope.newJourney = {
              transportationAndRatings: [{
                method: '',
                rating: 1
              }],
              startPoint: {
                lat : 0,
                long: 0
              },
              endPoint: {
                lat: 0,
                long: 0
              }
            };
            $scope.startMarker.latitude = null;
            $scope.startMarker.longitude = null;
            $scope.endMarker.latitude = null;
            $scope.endMarker.longitude = null;
            $scope.startMap.isOpen = true;
          })
          .error(function() {
            $scope.alerts.push({
              type: 'danger',              
              message1: 'Journey',
              messageBold: $scope.newJourney.name,
              message2: 'failed to save.'            
            });
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

    // Async loading of google maps sdk - stuff in here can reference maps api
    uiGmapGoogleMapApi.then(function(maps) {

    $scope.startMap = { 
      center: { latitude: 51.5, longitude: -0.12 }, 
      zoom: 8, 
      isOpen : true,
      refresh: false
    };

    $scope.startMarker = {
      id: 0,
      options: {
        draggable: $scope.startMap.isOpen,
        icon: {
          url: 'assets/images/startMarker.png',
          size: new google.maps.Size(40, 48),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(20, 48)
        },
      },
    };

    $scope.endMarker = {
      id: 0,
      options: {
        draggable: true,
        icon: {
          url: 'assets/images/endMarker.png',
          size: new google.maps.Size(40, 48),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(20, 48)
        },
      },
    };

    $scope.endMap = { 
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

    $scope.endMap.events = {
      click: function (mapModel, eventName, originalEventArgs) {
        $scope.endMarker.latitude = originalEventArgs[0].latLng.lat();
        $scope.endMarker.longitude = originalEventArgs[0].latLng.lng();
        $scope.newJourney.endPoint.lat = $scope.endMarker.latitude;
        $scope.newJourney.endPoint.long = $scope.endMarker.longitude;
        $scope.$apply();
      }
    };

    $scope.startMap.events = {
      click: function (mapModel, eventName, originalEventArgs) {
        $scope.startMarker.latitude = originalEventArgs[0].latLng.lat();
        $scope.startMarker.longitude = originalEventArgs[0].latLng.lng();
        $scope.newJourney.startPoint.lat = $scope.startMarker.latitude;
        $scope.newJourney.startPoint.long = $scope.startMarker.longitude;
        $scope.endMap.isOpen = true;
        $scope.$apply();
      }
    };

    $scope.$watch('endMap.isOpen', function() {
      $scope.endMap.refresh = $scope.endMap.isOpen;
      //console.log($scope.endMap.isOpen);
    });

  });
});
