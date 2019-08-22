"use strict";

angular.module("register")
  .controller("RegisterController", RegisterController)
  .directive('emailCheck', function (){ 
    return {
       require: 'ngModel',
       link: function(scope, elem, attr, ngModel) {
          var blacklist = [];
          ngModel.$parsers.unshift(function (value) {
            console.log(value);
            ngModel.$setValidity('blacklist', blacklist.indexOf(value) === -1);
            return value;
          });
       }
    };
 });

RegisterController.$inject = [ "UserService", "$scope", "$location" ];
function RegisterController (UserService, $scope, $location) {
  $scope.register = register;
  $scope.clearError = clearError;
  $scope.user = {
    email: null,
    password: null,
    company_type: "transporteur"
  };
  $scope.loading = false;

  // stores the errors coming from the server
  $scope.fieldErrors = {
    email: null,
    password: null
  }

  /**
   * Clears the error of a particular field 
   * @param {string} field the field error to clear
   */
  function clearError (field) {
    $scope.fieldErrors[field] = null;
  }

  function register () {
    console.log($scope.user);

    $scope.loading = true;
    
    UserService.Create($scope.user).then(function (response) {
      $scope.loading = false;
      
      if (typeof response._id !== "undefined") {
        // inscription validated, user is authenticated
        console.log(response);
      } else {
        // we check for the error
        if (response.field != null) {
          $scope.fieldErrors[response.field] = response.message;
        } else {
          // we have a generic error, because context is a test, we'll just alert the error
          alert(response.message);
        }
      }
    });
  }
}