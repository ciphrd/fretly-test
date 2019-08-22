"use strict"

const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const User = mongoose.model("Users")

// autheticate the user 
exports.authUser = function (req, res) {
  if (req.body.email && req.body.password) {
    User.authenticate(req.body.email, req.body.password, function (err, user) {
      if (err || !user) {
        var err = new Error("Wrong email or password")
        err.status = 401
        err.message = "Wrong email or password"
        res.send(err)
        return
      } else {
        console.log("we set the session user id");
        req.session.userId = user._id
        return res.send({
          success: true
        })
      }
    })
  } else {
    var err = new Error("All the fields are required")
    err.status = 400
    err.message = "All the fields are required"
    res.send(err)
    return
  }
}

exports.isAuth = function (req, res) {
  res.send({});
}

exports.addUser = function (req, res) {
  // a verification layer should be added there / this is going to be ignored because it is time consuming 

  console.log("add user")
  bcrypt.hash(req.body.password, 10, function (err, hash) {
    req.body.password = hash

    const newUser = new User(req.body)
    newUser.save(function (err, user) {
      if (err) {
        res.send(handleCreationError(err))
      }

      // we want to avoid the password to be sent back to the user 
      if (typeof(user) !== "undefined")
        delete user.password

      // let's authenticate the user
      //if (typeof(user._id) !== "undefined")
      //  req.session.userId = user._id
      
      res.json(user)
    })
  })
}

exports.deleteAll = function (req, res) {
  console.log("deleting all the users")
  User.remove({}, function (err, user) {
    if (err) {
      res.send(err)
    }
    res.json({
      message: "User database successfully cleared"
    })
  })
}

exports.getUsers = function (req, res) {
  User.find({}, function (err, user) {
    if (err) {
      res.send(err)
    }
    res.json(user)
  })
}

exports.getUser = function (req, res) {
  console.log("get user")
  User.findById(req.params.userId, function (err, user) {
    if (err) {
      res.send(err)
    }
    res.json(user)
  })
}

exports.updateUser = function (req, res) {
  console.log("update user - only siren should be editable")
  User.findOneAndUpdate({_id: req.params.userId}, req.body, {new: true}, function (err, user) {
    if (err) {
      res.send(err)
    }
    res.json(user)
  })
}


/**
 * This function turns the mongo DB error into a more friendly error that can be sent to the front 
 */
function handleCreationError (error) {
  if (error.code === 11000 || error.code === 11001) {
    // caused by duplicate email 
    return {
      code: error.code,
      message: "Cet email est déjà enregistré dans notre base",
      field: "email"
    }
  }

  // default error message 
  return {
    code: 0,
    message: "Une erreur inconnue est survenue. Merci de réessayer",
    field: null
  }
}