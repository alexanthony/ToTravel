'use strict';

describe('Filter: availableMethodsFilter', function () {

  // load the filter's module
  beforeEach(module('toTravelApp'));

  // initialize a new instance of the filter before each test
  var availableMethodsFilter;
  beforeEach(inject(function ($filter) {
    availableMethodsFilter = $filter('availableMethodsFilter');
  }));

  var allMethods = [
      {id: 'bike',  name: 'Bike', hasFAIcon: true, icon: 'fa-bicycle'},
      {id: 'walk',  name: 'Walk/Trek', hasFAIcon: true, icon: 'fa-compass'},
      {id: 'drive', name: 'Drive', hasFAIcon: true, icon: 'fa-car'},
      {id: 'fly',   name: 'Fly', hasFAIcon: true, icon: 'fa-plane'},
      {id: 'train', name: 'Train', hasFAIcon: true, icon: 'fa-train'},
      {id: 'boat',  name: 'Boat', hasFAIcon: true, icon: 'fa-ship'}
      ];

  it('should include all methods if no other options', function() {
    var availableMethods = availableMethodsFilter(allMethods, []);
    expect(availableMethods.length).toBe(allMethods.length);
    expect(availableMethods[0]).toBe(allMethods[0]);
  });

  it('should include current option even if it is already in used options', function() {
    var availableMethods = availableMethodsFilter(allMethods, [{method: 'fly'}], 'fly');
    expect(availableMethods).to.include({id: 'fly',   name: 'Fly', hasFAIcon: true, icon: 'fa-plane'});
  });

  // it('should return the input prefixed with "availableMethodsFilter filter:"', function () {
  //   var text = 'angularjs';
  //   expect(availableMethodsFilter(text)).toBe('availableMethodsFilter filter: ' + text);
  // });

});
