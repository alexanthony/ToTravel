'use strict';

angular.module('toTravelApp')
  .filter('availableMethodsFilter', function () {
    return function (allMethods, currentMethodsAndRatings, thisMethod) {
      var result = [];
      var i = 0;
      var includesMethod = function(methodAndRating) {
        return methodAndRating.method === allMethods[i].id;
      };
      for (i = 0; i < allMethods.length; i++) {
        if ((allMethods[i].id === thisMethod) || !currentMethodsAndRatings.some(includesMethod)) {
          result.push(allMethods[i]);
        }
      }
      return result;
    };
  });
