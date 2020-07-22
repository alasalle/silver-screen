const express = require('express');
const router = express.Router();
const { Comment } = require("../models/Comment");

//=================================
//             Subscribe
//=================================

router.post("/saveComment", (req, res) => {

    const comment = new Comment(req.body)

    comment.save((err, comment) => {
        if (err) return res.json({ status: false, err })

        Comment.find({ 'writer': comment.writer })
            .exec((err, result) => {
                if (err) return res.json({ status: false, err })
                return res.status(200).json({ status: true, result })
            })
    })
})

router.post("/getComments", (req, res) => {

    Comment.find({ "postId": req.body.movieId })
        .exec((err, comments) => {
            if (err) return res.status(400).send(err)
            res.status(200).json({ status: true, comments })
        })
});

module.exports = router;