const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = mongoose.Schema({
    writer: {
        type: String,
        ref: 'User'
    }, 
    postId: {
        type: String,
    },
    responseTo: {
        type: String,
        ref: 'User'
    },
    content: {
        type: String
    }

}, { timestamps: true })


const Comment = mongoose.model('Comment', commentSchema);

module.exports = { Comment }