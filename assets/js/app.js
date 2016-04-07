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
  }])
  .run(function($rootScope, $location) {
    $rootScope.$on( "$routeChangeError", function(event, current, previous, rejection) {
      if(rejection === "not_logged_in") {
        $location.path("/");
      }else if(rejection === "logged_in") {
        $location.path("/todo")
      }
    })
  });
