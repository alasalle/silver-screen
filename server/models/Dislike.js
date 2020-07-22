const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const dislikeSchema = mongoose.Schema(
  {
    userId: {
      type: String,
    },
    commentId: {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    },
    videoId: {
      type: String,
    },
  },
  { timestamps: true }
);

dislikeSchema.virtual(
  "disliker",
  {
    ref: "User", // The model to use
    localField: "userId", // Find people where `localField`
    foreignField: "username", // is equal to `foreignField`
    // If `justOne` is true, 'members' will be a single doc as opposed to
    // an array. `justOne` is false by default.
    justOne: true, // Query options, see http://bit.ly/mongoose-query-options
  },
  { toJSON: { virtuals: true } }
);

const Dislike = mongoose.model("Dislike", dislikeSchema);

module.exports = { Dislike };
