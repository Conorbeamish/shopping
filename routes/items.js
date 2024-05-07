const express = require("express");
const db = require("../models/index");
const router = express.Router({ mergeParams: true});

const getItems = async function(req, res,next){
  try{
    let items = await db.Item.find({user: req.params.id})
    return res.status(200).json(items);
  } catch(err) {
    return next(err);
  }
}

router
  .route("/")
  .get(getItems);

module.exports = router;