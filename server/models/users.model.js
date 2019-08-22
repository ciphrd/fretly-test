"use strict"

const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const Schema = mongoose.Schema


const UserSchema = new Schema({
  email: {
    type: String,
    unqiue: true,
    required: true,
    trim: true
  },
  added: { 
    type: Date, 
    default: Date.now 
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  company_type: {
    type: [{
      type: String, 
      enum: ["transporteur", "chargeur"]
    }],
    default: ["transporteur"],
    required: true
  },
  siren: {
    type: String,
    default: null
  }
})

// authenticate input against database 
UserSchema.statics.authenticate = function (email, password, callback) {
  UsersModel.findOne({ email: email })
    .select('+password') // password is hidden from selection 
    .exec(function (err, user) {
      if (err) {
        return callback(err)
      } else if (!user) {
        var err = new Error("Utilisateur introuvable")
        err.status = 401
        err.message = "Utilisateur introuvable"
        return callback(err)
      }
      // now we compare the passwords 
      bcrypt.compare(password, user.password, function (err, result) {
        if (result === true) {
          return callback(null, user)
        } else {
          var err = new Error("Mot de passe incorrect")
          err.status = 402
          err.message = "Mot de passe incorrect"
          return callback(err)
        }
      })
    })
}

const UsersModel = mongoose.model("Users", UserSchema)
UsersModel.createIndexes()

module.exports = UsersModel