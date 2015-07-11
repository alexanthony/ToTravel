'use strict';

describe('Service: locationData', function () {

  // load the service's module
  //beforeEach(module('toTravelApp'));

  // instantiate service
  var locationData;
  beforeEach(inject(function (_locationData_) {
    locationData = _locationData_;
  }));

  it('should have countries', function() {
    expect(!!locationData).to.have.property('countries');
  });

  it('countries should be a list', function () {
    expect(!!locationData.countries).to.be.instanceof(Array);
    expect(!!locationData.countries).to.not.be.empty;
  });

  it('countries should have country objects, with a name and code', function() {
    expect(!!locationData.countries[0]).to.be.an('object');
    expect(!!locationData.countries[0]).to.have.all.keys(['name', 'code']);
  })

});
