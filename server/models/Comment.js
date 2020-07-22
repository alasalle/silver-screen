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
      ref: "Comment"
    },
    content: {
      type: String,
    },
  },
  { timestamps: true }
);

commentSchema.virtual(
  "commenter",
  {
    ref: "User", // The model to use
    localField: "writer", // Find people where `localField`
    foreignField: "username", // is equal to `foreignField`
    // If `justOne` is true, 'members' will be a single doc as opposed to
    // an array. `justOne` is false by default.
    justOne: true, // Query options, see http://bit.ly/mongoose-query-options
  },
  { toJSON: { virtuals: true } }
);

const Comment = mongoose.model("Comment", commentSchema);

module.exports = { Comment };
