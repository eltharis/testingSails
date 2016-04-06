/**
 * Created by wpr on 04.04.16.
 */

'use strict';

angular.module('todo.TodoModule', ['ngRoute', 'ui.bootstrap', "todo.PermissionModule"])
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/todo', {
      templateUrl: 'templates/todo.html',
      controller: 'TodoCtrl',
      resolve: {
        load: ["$q", "Permissions", function ($q, Permissions) {
          return Permissions.mustBeLoggedIn();
        }]
      }
    });
  }])
  .controller('TodoCtrl', ['$scope', '$rootScope', '$location', 'User', 'Todo', function ($scope, $rootScope, $location, User, Todo) {
    $scope.formData = {};
    $scope.todos = [];

    $scope.todos = Todo.getTodos();

    $scope.addTodo = function () {
      Todo.addTodo($scope.formData).$promise.then(function (response) {
        $scope.todos.push($scope.formData);
        $scope.formData = {};
      });
    };

    $scope.removeTodo = function (todo) {
      Todo.removeTodo(todo).$promise.then(function (response) {
        $scope.todos.splice($scope.todos.indexOf(todo), 1);
      });
    };

    $scope.logout = function () {
      User.logout(null, function (response) {
        $location.path("/");
      });
    }
  }])
  .service('Todo', ['$resource', function ($resource) {
    return $resource('/api/todo', null, {
      getTodos: {
        method: 'GET',
        url: '/todo/getTodos',
        isArray: true
      },
      addTodo: {
        method: 'POST',
        url: '/todo/addTodo',
        params: {
          value: '@value'
        }
      },
      removeTodo: {
        method: 'POST',
        url: '/todo/removeTodo',
        params: {
          value: '@value'
        },
        isArray: true
      }
    });
  }]);
