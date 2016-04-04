/**
 * Created by wpr on 03.04.16.
 */

'use strict';

angular.module('todoApp', ['ngRoute', 'ui.bootstrap', 'todo.TodoModule', 'todo.LoginModule'])
  .config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.otherwise({
      redirectTo: '/',
      caseInsensitiveMatch: true
    })
  }]);
