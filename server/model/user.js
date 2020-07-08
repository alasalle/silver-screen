const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const config = require("../config/key");

const saltRounds = 10;

const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50,
  },
  email: {
    type: String,
    trim: true,
    unique: 1
  },
  password: {
    type: String,
    minlength: 8
  },
  lastname: {
    type: String,
    maxlength: 50
  },
  role: {
    type: Number,
    default: 0
  },
  token: {
    type: String
  },
  tokenExpiration: {
    type: Number
  }
})

userSchema.pre("save", function(next) {
  let user = this;
  console.log({USER: user})

  if (user.isModified("password")) {
    
    bcrypt.genSalt(saltRounds, (err, salt) => {
      if (err) return next(err);
  
      bcrypt.hash(user.password, salt, (err, hash) => {
        if (err) return next(err);
  
        user.password = hash
        next();
      })
    })

  } else {
    next();
  }

})

userSchema.methods.comparePassword = function(password, cb) {
  bcrypt.compare(password, this.password, function(err, isMatch) {
    if (err) return cb(err);

    cb(null, isMatch)
  })
}

userSchema.methods.generateToken = function(cb) {
  let user = this;
  let token = jwt.sign(user._id.toHexString(), config.secret);
  user.token = token;
  user.save(function (err, user) {
    if (err) return cb(err);

    cb(null, user);
  })
}

const User = mongoose.model("users", userSchema)

module.exports = { User }