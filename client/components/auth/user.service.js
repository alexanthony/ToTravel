'use strict';

angular.module('toTravelApp')
  .factory('User', function ($resource) {
    return $resource('/api/users/:id/:controller', {
      id: '@_id'
    },
    {
      changePassword: {
        method: 'PUT',
        params: {
          controller:'password'
        }
      },
      get: {
        method: 'GET',
        params: {
          id:'me'
        }
      },
      updateMe: {
        method: 'PUT',
        params: {
          id:'me'
        }
      }
	  });
  });
