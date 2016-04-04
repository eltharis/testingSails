/**
 * Created by wpr on 04.04.16.
 */

'use strict';

angular.module('todo.LoginModule', [])
  .config([function () {

  }])
  .controller('LoginCtrl', ['$scope', '$rootScope', 'LoginService', function ($scope, $rootScope, LoginService) {
    $scope.formData = {};

    $scope.login = function () {
      LoginService.login($scope.formData).then(function (response) {
        console.log(response);
      })
    }
  }])
  .service('LoginService', function ($http, $q) {
    return {
      'login': function (data) {
        var defer = $q.defer();
        $http.post('/auth/login', data).success(function (response) {
          defer.resolve(response);
        })
        .error(function (response) {
          defer.reject(response);
        });
        return defer.promise;
      }
    }
  });
