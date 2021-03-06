const express = require("express");
const router = express.Router();

const { Favorite } = require("../models/Favorite");
const { jwtCheck } = require("../middleware/auth");

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

router.post("/fetchFavorites", jwtCheck, (req, res) => {
  Favorite.find({
    userFrom: req.body.userFrom,
  }).exec((err, favorites) => {
    if (err) return res.status(400).json({ status: false, err });

    res.status(200).json({ status: true, faves: favorites });
  });
});

router.post("/addToFavorites", jwtCheck, (req, res) => {
  let fave = new Favorite(req.body);

  fave.save((err, favorite) => {
    if (err) return res.json({ status: false, err });

    return res.status(200).json({ status: true, favorite });
  });
});

router.post("/removeFromFavorite", jwtCheck, (req, res) => {
  Favorite.deleteOne(
    { movieId: req.body.movieId, userFrom: req.body.userFrom },
    (err) => {
      if (err) return res.json({ status: false, err });

      return res.status(200).json({ status: true });
    }
  );
});

module.exports = router;
