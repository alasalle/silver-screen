require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const config = require("./config/key");

const { User } = require("./model/user");
const { auth } = require("./middleware/auth");

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("DB CONNECTED"))
  .catch((err) => console.error(err));

app.get("/", (req, res) => {
  res.json({message: "Welcome to Silver Screen!"});
});

app.get("/api/user/auth", auth, (req, res) => {
  res.status(200).json({
    isAuth: true,
    _id: req.user._id,
    role: req.user.role,
    name: req.user.name,
    lastname: req.user.lastname,
    email: req.user.email
  })
});

app.post("/api/user/register", (req, res) => {
  const user = new User(req.body);

  user.save((err, userData) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ success: true, userData });
  });
});

app.post("/api/user/login", (req, res) => {
  // find the email

  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user)
      return res
        .status(400)
        .json({ loginSuccess: false, message: "email authentication failed" });

    // compare password with pass hash

    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch) {
        return res
          .status(400)
          .json({
            loginSuccess: false,
            message: "login authentication failed",
          });
      }

      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);

        res
          .cookie("x_auth", user.token)
          .status(200)
          .json({ loginSuccess: true });
      });
    });
    // generate token
  });
});

app.get("/api/user/logout", auth, (req, res) => {
  User.findOneAndUpdate({_id: req.user._id}, {token: ""}, (err, doc) => {
    if (err) return res.status(500).json({logoutSuccess: false, err});
    return res.status(200).send({logoutSuccess: true})
  })
})

app.listen(config.port, (err) => {
  if (err) console.error(err);
  console.log(`server is listening on port ${config.port}`);
});
