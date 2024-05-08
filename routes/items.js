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

const deleteItem = async function(req, res, next) {
    try {
        const itemId = req.params.item_id;
        const deletedItem = await db.Item.findByIdAndDelete(itemId);

        if (!deletedItem) {
            return res.status(404).json({ message: "Item not found" });
        }

        return res.status(200).json(deletedItem);
    } catch (err) {
        return next(err);
    }
}

const toggleComplete = async function(req, res, next) {
    try {
        let item = await db.Item.findById(req.params.item_id);
        if (!item) {
            return res.status(404).json({ message: "Item not found" });
        }
        
        // Toggle the complete status
        item.isComplete = !item.isComplete;
        await item.save();
        
        return res.status(200).json(item);
    } catch (err) {
        return next(err);
    }
}

const createItem = async function(req, res, next){
    try{
        // Create a new item using the provided data
        let newItem = await db.Item.create({
            user: req.params.id,
            name: req.body.name,
            price: req.body.price
        });

        // Find the user associated with the item and update their items array
        let foundUser = await db.User.findById(req.params.id);
        foundUser.items.push(newItem.id);
        await foundUser.save();

        // Populate the newItem with the user's username
        let populatedItem = await db.Item.findById(newItem._id).populate("user", {
            username: true
        });

        // Return the newly created item with the user's username
        return res.status(200).json(populatedItem);
    } catch(err) {
        return next(err);
    }
}

router
  .route("/")
  .get(getItems)
  .post(createItem);

router
  .route("/spendingLimit") // Endpoint to get spending total
  .get(getSpendingLimit);

router
.route("/:item_id")
.delete(deleteItem)
.put(toggleComplete); // Endpoint to toggle item completion status


module.exports = {
    router: router,
    getItems,
    getSpendingLimit,
    deleteItem,
    toggleComplete,
    createItem
  };