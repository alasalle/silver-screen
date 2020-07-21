const express = require("express");
const router = express.Router();

const { Favorite } = require("../models/Favorite");

//=================================
//             Subscribe
//=================================

router.post("/favoriteNumber", (req, res) => {
  Favorite.find({ movieId: req.body.movieId }).exec((err, subscribe) => {
    if (err) return res.status(400).send(err);

    res.status(200).json({ status: true, subscribeNumber: subscribe.length });
  });
});

router.post("/favorited", (req, res) => {
  Favorite.find({
    movieId: req.body.movieId,
    userFrom: req.body.userFrom,
  }).exec((err, subscribe) => {
    if (err) return res.status(400).send(err);

    let result = false;
    if (subscribe.length !== 0) {
      result = true;
    }

    res.status(200).json({ status: true, subcribed: result });
  });
});

router.post("/addToFavorites", (req, res) => {
  let fave = new Favorite(req.body);

  fave.save((err, favorite) => {
    if (err) return res.json({ status: false, err });

    return res.status(200).json({ status: true, favorite });
  });
});

router.post("/removeFromFavorite", (req, res) => {
    
  
    Fave.deleteOne({movieId: req.body.movieId, userFrom: req.body.userFrom}, (err) => {
      if (err) return res.json({ status: false, err });
  
      return res.status(200).json({ status: true});
    });
  });
  

module.exports = router;
