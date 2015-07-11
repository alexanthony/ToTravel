'use strict';

angular.module('toTravelApp')
  .controller('SettingsCtrl', function ($scope, User, Auth, locationData) {
    $scope.errors = {};

    $scope.user = {
      country: ''
    };

    $scope.passwordChange = {};

    $scope.user = User.get();

    $scope.alerts = [];

    $scope.changePassword = function(form) {
      $scope.submitted = true;
      if(form.$valid) {
        Auth.changePassword( $scope.passwordChange.oldPassword, $scope.passwordChange.newPassword )
        .then( function() {
          $scope.passwordMessage = 'Password successfully changed.';
        })
        .catch( function() {
          form.password.$setValidity('mongoose', false);
          $scope.passwordErrors.other = 'Incorrect password';
          $scope.passwordMessage = '';
        });
      }
		};

    $scope.closeAlert = function(index) {
      $scope.alerts.splice(index, 1);
    };

    $scope.saveUserDetails = function() {
      User.updateMe($scope.user, function(data) {
          $scope.user = data;
          Auth.updateCurrentUser($scope.user);
          $scope.alerts.push({type: 'success', message: 'User details updated.'});
        }, function(err) {
          console.log(err);
          $scope.alerts.push({type: 'danger', message: err});
        });
    };

    $scope.revertUserDetails = function() {
      $scope.user = User.get();
    };

    $scope.countries = locationData.countries;
  });
