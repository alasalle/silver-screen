const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const config = require("./config/key");

const app = express();

const mongoose = require("mongoose");

const connect = mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use("/api/comments", require("./routes/comments"));
app.use("/api/likes", require("./routes/likes"));
app.use("/api/favorites", require("./routes/favorites"));

app.get("/", (req, res) => {
  res.json({ message: "Welcome to Silver Screen" });
});

//use this to show the image you have in node js server to client (react js)
//https://stackoverflow.com/questions/48914987/send-image-path-from-node-js-express-server-to-react-client
app.use("/uploads", express.static("uploads"));

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  // index.html for all page routes
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(config.port, () => {
  console.log(`Server Running at ${config.port}`);
});
