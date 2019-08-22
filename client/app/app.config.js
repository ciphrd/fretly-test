"use strict";

angular.module("fretlyApp")
  .config(config)
  .run(run);
  
config.$inject = ["$routeProvider"]
function config ($routeProvider) {
  $routeProvider.when("/login", {
    controller: "LoginController",
    templateUrl: "/login/login.template.html"
  }).when("/register", {
    controller: "RegisterController",
    templateUrl: "/register/register.template.html"
  }).when("/siren", {
    controller: "SirenController", 
    templateUrl: "/siren/siren.template.html"
  }).otherwise("/register");
}

run.$inject = ['$rootScope', '$location', 'UserService']
function run ($rootScope, $location, UserService) {
  // client side restrictions should be set here 
  var protectedPages = [ "/siren" ]; 
  if (protectedPages.includes($location.path())) {
    //UserService.IsAuthed();
  }
}