'use strict';

angular.module('toTravelApp')
  .controller('SettingsCtrl', function ($scope, User, Auth, locationData) {
    $scope.errors = {};

    $scope.user = {
      country: ''
    };

    $scope.passwordChange = {};

    $scope.user = User.get();
    $scope.user.$promise.then(function() {
      updateAvailableImgSources();
    });

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
      $scope.alerts = [];
      User.updateMe($scope.user, function(data) {
          $scope.user = data;
          Auth.updateCurrentUser($scope.user);
          $scope.alerts.push({type: 'success', message: 'User details updated.'});
          updateAvailableImgSources();
        }, function(err) {
          console.log(err);
          //$scope.alerts.push({type: 'danger', message: err.message});
          for (var error in err.data.errors) {
            $scope.alerts.push({type: 'danger', message: err.data.errors[error].message});
          }
        });
    };

    $scope.revertUserDetails = function() {
      $scope.user = User.get();
      updateAvailableImgSources();
    };

    $scope.userImageUrl = function() {
      if ($scope.user.imgSrc === 'gravatar') {
        return 'http://avatars.io/email/'+$scope.user.email+'?size=large';
      } else {
        return 'http://s3.amazonaws.com/cdn.getchute.com/v1/images/avatars.io/avatar-128.png';
      }
    };

    $scope.availableImgSources = [{code: 'custom', name: 'Custom...'}];

    var updateAvailableImgSources = function() {
      $scope.availableImgSources = [];
      if ($scope.user.facebook && $scope.user.facebook !== {}) {
        $scope.availableImgSources.push({code: 'facebook', name: 'Facebook'});
      }
      if ($scope.user.twitter && $scope.user.twitter !== {}) {
        $scope.availableImgSources.push({code: 'twitter', name: 'Twitter'});
      }
      if ($scope.user.google && $scope.user.google !== {}) {
        $scope.availableImgSources.push({code: 'google', name: 'Google'});
      }
      if ($scope.user.email && $scope.user.email.length > 0) {
        $scope.availableImgSources.push({code: 'gravatar', name: 'Gravatar'});
      }
      $scope.availableImgSources.push({code: 'custom', name: 'Custom...'});
      return $scope.availableImgSources;
    };

    $scope.countries = locationData.countries;
  });
