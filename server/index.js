require('dotenv').config()

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const DB_SECRET = process.env.DB_SECRET;
const port = process.env.PORT || 8080;

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());


mongoose.connect(DB_SECRET, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("DB CONNECTED"))
  .catch(err => console.error(err));


app.get("/", (req, res) => {
  res.send("Welcome to Silver Screen!")
})

app.listen(port, err => {
  if (err) console.error(err);
  console.log(`server is listening on port ${port}`);
});