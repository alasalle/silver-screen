const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = mongoose.Schema(
  {
    writer: {
      type: String,
    },
    postId: {
      type: String,
      ref: "Movie",
    },
    responseTo: {
      type: String,
      ref: "Comment",
    },
    content: {
      type: String,
    },
  },
  { timestamps: true }
);

const Comment = mongoose.model("Comment", commentSchema);

module.exports = { Comment };
