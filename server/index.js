require('dotenv').config()

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const { User } = require("./model/user");

const DB_SECRET = process.env.DB_SECRET;
const port = process.env.PORT || 8080;

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());


mongoose.connect(DB_SECRET, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}).then(() => console.log("DB CONNECTED"))
  .catch(err => console.error(err));


app.get("/", (req, res) => {
  res.send("Welcome to Silver Screen!")
})

app.post("/api/users/register", (req, res) => {

  const user = new User(req.body);

  user.save((err, userData) => {
    if(err) return res.json({success: false, err})
  })
  return res.status(200)
})

app.listen(port, err => {
  if (err) console.error(err);
  console.log(`server is listening on port ${port}`);
});