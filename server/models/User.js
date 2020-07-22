const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: {
        type:String,
        maxlength:50,
        unique: 1
    },
    email: {
        type:String,
        trim:true,
        unique: 1 
    },
    role : {
        type:Number,
        default: 0 
    },
    image: {
        type: String,
        default: 'https://ibb.co/zFMTZ8Y'
    }
})

const User = mongoose.model('User', userSchema);

module.exports = { User }