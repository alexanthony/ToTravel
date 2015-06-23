'use strict';

describe('Controller: CreditsCtrl', function () {

  // load the controller's module
  beforeEach(module('toTravelApp'));

  var CreditsCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CreditsCtrl = $controller('CreditsCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
