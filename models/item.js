const mongoose = require("mongoose");
const User = require("./user");

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price : {
    type: Number,
    default: 1,
  },
  isComplete:{
    type:Boolean,
    default: false
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
})

//This function removes the item from associated entries
itemSchema.pre("remove", async function(next){
  try{
    //Remove item from associated user
    let user = await User.findById(this.user);
    user.item.remove(this.id);
    await user.save();
    return next();
  } catch(err){
      return next(err);
  }
})



const Item = mongoose.model("Item", itemSchema);
module.exports = Item;