const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const favoriteSchema = mongoose.Schema(
  {
    userFrom: {
      type: String,
    },
    movieId: {
      type: String,
      ref: "Movie",
    },
    movieTitle: {
      type: String,
    },
    moviePost: {
      type: String,
    },
    movieRunTime: {
      type: String,
    },
  },
  { timestamps: true }
);

favoriteSchema.virtual(
  "favoriter",
  {
    ref: "User", // The model to use
    localField: "userFrom", // Find people where `localField`
    foreignField: "auth_id", // is equal to `foreignField`
    // If `justOne` is true, 'members' will be a single doc as opposed to
    // an array. `justOne` is false by default.
    justOne: true, // Query options, see http://bit.ly/mongoose-query-options
  },
  { toJSON: { virtuals: true } }
);

const Favorite = mongoose.model("Favorite", favoriteSchema);

module.exports = { Favorite };
