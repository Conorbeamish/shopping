const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Item = require("./item");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  items: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "item"
  }],
});

//Hash and Salt
userSchema.pre("save", async function(next) {
  try {
    if (!this.isModified("password")) {
      return next();
    }
    let hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;

    //Seed items for user
    const groceryItems = [
      { name: "Apples", price: 2.99 },
      { name: "Milk", price: 1.49 },
      { name: "Bread", price: 3.25 },
      { name: "Eggs", price: 2.19 },
      { name: "Cheese", price: 4.99 }
    ];

    for (const groceryItem of groceryItems) {
      const item = new Item({
        name: groceryItem.name,
        price: groceryItem.price,
        user: this._id // Associate the item with the current user
      });
      await item.save();
      this.items.push(item._id); // Add the item's ObjectId to the user's items array
    }

    return next();
  } catch (err) {
    return next(err);
  }
});
//Check password
userSchema.methods.comparePassword = async function(attemptPassword, next){
  try{
      let isMatch = await bcrypt.compare(attemptPassword, this.password);
      return isMatch;
  } catch (err){
      return next(err);
  }
}

const User = mongoose.model("User", userSchema);

module.exports = User;