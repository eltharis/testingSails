/**
 * Created by wpr on 04.04.16.
 */

'use strict';

angular.module('todo.LoginModule', ['ngRoute', 'ngResource', 'ui.bootstrap'])
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/', {
      templateUrl: 'templates/login.html',
      controller: 'LoginCtrl',
      resolve: {
        load: ["$q", "LoginService", function ($q, LoginService) {
          var defer = $q.defer();
          var result = LoginService.isLoggedIn(null, function (response) {
            console.log(response);
            if(!response.authenticated) {
              defer.resolve();
            }else{
              defer.reject("logged_in");
            }
          });
          return defer.promise;
        }]
      }
    });
  }])
  .controller('LoginCtrl', ['$scope', '$rootScope', '$location', 'LoginService', function ($scope, $rootScope, $location, LoginService) {

    $scope.formData = {};

    $scope.login = function () {
      var user = LoginService.login($scope.formData);
      $location.path('/todo');
    }
  }])
  .service('LoginService', ['$resource', function ($resource) {
    return $resource('/auth/', null,
      {
        'isLoggedIn': {
          method: 'GET',
          url: '/auth/isLoggedIn'
        },
        'login': {
          method: 'POST',
          url: '/auth/login'
        },
        'logout': {
          method: 'GET',
          url: '/auth/logout'
        }
      })

  }]);
