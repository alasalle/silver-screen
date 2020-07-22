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


const Dislike = mongoose.model("Dislike", dislikeSchema);

module.exports = { Dislike };
