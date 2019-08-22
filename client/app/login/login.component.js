"use strict";

angular.module("login")
  .controller("LoginController", LoginController);

LoginController.$inject = [ "UserService", "$scope", "$location" ];
function LoginController (UserService, $scope, $location) {
  $scope.login = login;
  
  $scope.user = {
    email: null,
    password: null
  };
  $scope.loading = false;

  function login () {
    console.log($scope.user);

    $scope.loading = true;
    
    UserService.Authenticate($scope.user).then(function (response) {
      $scope.loading = false;
      console.log(response);
    });
  }
}