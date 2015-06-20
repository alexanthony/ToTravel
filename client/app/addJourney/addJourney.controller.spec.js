'use strict';

describe('Controller: AddJourneyCtrl', function () {

  // load the controller's module
  beforeEach(module('toTravelApp'));

  var AddJourneyCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AddJourneyCtrl = $controller('AddJourneyCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
