'use strict';

angular.module('toTravelApp')
  .factory('journeyFactory', function ($http) {
    // Service logic
    // ...

    // Public API here
    return {
      getJourneys : function() {
        return $http.get('/api/journeys');
      },
      getJourney : function(id) {
        return $http.get('/api/journeys/'+id);
      },
      create : function(journeyData) {
        return $http.post('/api/journeys', journeyData);
      },
      delete : function(id) {
        return $http.delete('/api/journeys/' + id);
      },
      update : function(id, journeyData) {
        for (var i = 0; i < journeyData.transportationAndRatings.length; i++) {
          delete journeyData.transportationAndRatings[i].averageRating;
        }
        return $http.put('/api/journeys/' + id, journeyData);
      }
    };
  });
