/**
 * Created by wpr on 04.04.16.
 */

'use strict';

angular.module('todo.LoginModule', ['ngRoute', 'ngResource', 'ui.bootstrap', 'todo.PermissionModule'])
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/', {
      templateUrl: 'templates/login.html',
      controller: 'LoginCtrl',
      resolve: {
        load: ["$q", "Permissions", function ($q, Permissions) {
          return Permissions.cantBeLoggedIn();
        }]
      }
    });
  }])
  .controller('LoginCtrl', ['$scope', '$rootScope', '$location', 'User', function ($scope, $rootScope, $location, User) {

    $scope.formData = {};

    $scope.login = function () {
      User.login($scope.formData, function(response) {
        $location.path('/todo');
      });
    }
  }])
  .service('User', ['$resource', function ($resource) {
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
