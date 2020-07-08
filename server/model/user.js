const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

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

userSchema.pre("save", (next) => {
  let user = this;

  if (user.isModified("password")) {
    
    bcrypt.genSalt(saltRounds, (err, salt) => {
      if (err) return next(err);
  
      bcrypt.hash(user.password, salt, (err, hash) => {
        if (err) return next(err);
  
        user.password = hash
      })
    })

  } else {
    next();
  }

})

const User = mongoose.model("users", userSchema)

module.exports = { User }