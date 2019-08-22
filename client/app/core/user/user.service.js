"use strict";

const API_URL = "http://localhost:3100/";

angular.module("core.user")
  .factory("UserService", UserService);

UserService.$inject = [ "$http" ];

function UserService ($http) {
  var service = {};

  service.GetAll = GetAll;
  service.Create = Create;
  service.Authenticate = Authenticate;
  service.IsAuthed = IsAuthed;

  return service;

  // checks whether the user is logged or not 
  function IsAuthed () {
    return $http.post(API_URL+"isauth").then(function (msg) {
      console.log(msg)
    }, function (msg) {
      console.log(msg)
    });
  }

  // tries to login the user 
  function Authenticate (user) {
    return $http.post(API_URL+"auth", user).then(handleSuccess, handleError);
  }

  // fetch all the users from the database 
  function GetAll () {
    return $http.get(API_URL+"users").then(handleSuccess, handleError);
  }

  // creates a new user 
  function Create (user) {
    return $http.post(API_URL+"users", user).then(handleSuccess, handleError);
  }
  
  function handleSuccess (res) {
    return res.data;
  }

  function handleError (error) {
    return function () {
      return { 
        sucess: false,
        message: error
      }
    }
  }
}