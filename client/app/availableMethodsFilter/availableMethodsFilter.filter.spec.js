'use strict';

describe('Filter: availableMethodsFilter', function () {

  // load the filter's module
  beforeEach(module('toTravelApp'));

  // initialize a new instance of the filter before each test
  var availableMethodsFilter;
  beforeEach(inject(function ($filter) {
    availableMethodsFilter = $filter('availableMethodsFilter');
  }));

  it('should return the input prefixed with "availableMethodsFilter filter:"', function () {
    var text = 'angularjs';
    expect(availableMethodsFilter(text)).toBe('availableMethodsFilter filter: ' + text);
  });

});
