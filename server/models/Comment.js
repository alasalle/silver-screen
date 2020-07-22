const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = mongoose.Schema({
    writer: {
        type: String
    },
    postId: {
        type: String,
        ref: 'Movie'
    },
    responseTo: {
        type: String
    },
    content: {
        type: String
    }

}, { timestamps: true })

Comment.virtual('commenter', {
    ref: 'User', // The model to use
    localField: 'writer', // Find people where `localField`
    foreignField: 'auth_id', // is equal to `foreignField`
    // If `justOne` is true, 'members' will be a single doc as opposed to
    // an array. `justOne` is false by default.
    justOne: true, // Query options, see http://bit.ly/mongoose-query-options
  }, { toJSON: { virtuals: true } });

  Comment.virtual('respondedTo', {
    ref: 'User', // The model to use
    localField: 'responseTo', // Find people where `localField`
    foreignField: 'auth_id', // is equal to `foreignField`
    // If `justOne` is true, 'members' will be a single doc as opposed to
    // an array. `justOne` is false by default.
    justOne: true, // Query options, see http://bit.ly/mongoose-query-options
  }, { toJSON: { virtuals: true } });


const Comment = mongoose.model('Comment', commentSchema);

module.exports = { Comment }