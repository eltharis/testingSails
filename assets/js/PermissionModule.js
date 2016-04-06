/**
 * Created by wpr on 06.04.16.
 */

angular.module("todo.PermissionModule", ['todo.LoginModule'])
  .factory("Permissions", ['$q', 'User', function ($q, User) {
    return {
      mustBeLoggedIn: function () {
        var defer = $q.defer();
        User.isLoggedIn(null, function (response) {
          if(response.authenticated) {
            defer.resolve();
          } else {
            defer.reject("not_logged_in");
          }
        });
        return defer.promise;
      },

      cantBeLoggedIn: function () {
        var defer = $q.defer();
        User.isLoggedIn(null, function (response) {
          if(!response.authenticated) {
            defer.resolve();
          } else {
            defer.reject("logged_in");
          }
        });
        return defer.promise;
      }
    }
  }]);
