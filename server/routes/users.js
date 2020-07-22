const express = require('express');
const router = express.Router();
const { User } = require("../models/User");

//=================================
//             User
//=================================

router.post("/register", (req, res) => {

    const user = new User(req.body);

    user.save((err, doc) => {
        if (err) return res.json({ status: false, err });
        return res.status(200).json({
            status: true, doc
        });
    });
});



module.exports = router;