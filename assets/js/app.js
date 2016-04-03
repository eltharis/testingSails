/**
 * Created by wpr on 03.04.16.
 */

'use strict';

angular.module('todoApp', ['ngRoute', 'ui.bootstrap'])
  .config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.when('/', {
      templateUrl: 'templates/todo.html',
      controller: 'TodoCtrl'
    }).otherwise({
      redirectTo: '/',
      caseInsensitiveMatch: true
    })
  }])
  .controller('TodoCtrl', ['$scope', '$rootScope', 'TodoService', function($scope, $rootScope, TodoService) {
    $scope.formData = {};
    $scope.todos = [];

    TodoService.getTodos().then(function (response) {
      $scope.todos = response;
    });

    $scope.addTodo = function() {
      TodoService.addTodo($scope.formData).then(function(response) {
        $scope.todos.push($scope.formData);
        $scope.formData = {};
      });
    };

    $scope.removeTodo = function(todo) {
      TodoService.removeTodo(todo).then(function(response) {
        $scope.todos.splice($scope.todos.indexOf(todo), 1);
      });
    };
  }])
  .service('TodoService', function($http, $q) {
    return {
      'getTodos': function() {
        var defer = $q.defer();
        $http.get('/todo/getTodos').success(function (response) {
          defer.resolve(response);
        }).error(function (error) {
          defer.reject(error);
        });
        return defer.promise;
      },
      'addTodo': function(todo) {
        var defer = $q.defer();
        $http.post('/todo/addTodo', todo).success(function(resp){
          defer.resolve(resp);
        }).error( function(err) {
          defer.reject(err);
        });
        return defer.promise;
      },
      'removeTodo': function(todo) {
        var defer = $q.defer();
        $http.post('/todo/removeTodo', todo).success(function(resp){
          defer.resolve(resp);
        }).error( function(err) {
          defer.reject(err);
        });
        return defer.promise;
      }
    }
  });
