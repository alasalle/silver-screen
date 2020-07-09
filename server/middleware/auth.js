const { User } = require("../model/user");

let auth = (req, res, next) => {
  let token = req.cookies.x_auth;

  User.findByToken(token, (err, user) => {
    if (err) throw err;
    if(!user) return res.status(400).json({isAuth: "false", message: "not authenticated"})
    req.token = token;
    req.user = user;
    next();
  });
}

module.exports = { auth };