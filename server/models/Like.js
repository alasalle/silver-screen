const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const likeSchema = mongoose.Schema({
   userId: {
       type: String,
       ref: 'User'
   },
   commentId: {
       type: String,
       ref: 'Comment'
   },
   videoId: {
       type: String,
   }

}, { timestamps: true })


const Like = mongoose.model('Like', likeSchema);

module.exports = { Like }