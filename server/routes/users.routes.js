"use strict"

module.exports = function (app) {
  const controller = require("../controllers/users.controller")

  app.route("/users")
    .get(controller.getUsers)
    .post(controller.addUser)
    .delete(controller.deleteAll)

  app.route("/user/:userId")
    .get(controller.getUser)
    .put(controller.updateUser)
}