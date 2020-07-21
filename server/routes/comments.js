const express = require('express');
const router = express.Router();
const { Comment } = require("../models/Comment");
const { User } = require("../models/User");

//=================================
//             Subscribe
//=================================

router.post("/saveComment", (req, res) => {

    const user = User.findOne({_id: req.body.writer});
    res.json({COMMENT_USER: user})

    // const comment = new Comment(req.body)

    // comment.save((err, comment) => {
    //     console.log(err)
    //     if (err) return res.json({ status: false, err })

    //     Comment.find({ '_id': comment._id })
    //         .populate('writer')
    //         .exec((err, result) => {
    //             if (err) return res.json({ status: false, err })
    //             return res.status(200).json({ status: true, result })
    //         })
    // })
})

router.post("/getComments", (req, res) => {

    Comment.find({ "postId": req.body.movieId })
        .populate('writer')
        .exec((err, comments) => {
            if (err) return res.status(400).send(err)
            res.status(200).json({ status: true, comments })
        })
});

module.exports = router;