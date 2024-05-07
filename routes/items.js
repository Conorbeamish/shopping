const express = require("express");
const db = require("../models/index");
const router = express.Router({ mergeParams: true });

const getItems = async function(req, res, next) {
    try {
        let items = await db.Item.find({ user: req.params.id });
        return res.status(200).json(items);
    } catch(err) {
        return next(err);
    }
}

const getSpendingLimit = async function(req, res, next) {
    try {
        const user = await db.User.findById(req.params.id); 

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const spendingLimit = user.spendingLimit;
        return res.status(200).json({ spendingLimit });
    } catch(err) {
        return next(err);
    }
}

router
  .route("/")
  .get(getItems);

router
  .route("/spendingLimit") // Endpoint to get spending total
  .get(getSpendingLimit);

module.exports = router;