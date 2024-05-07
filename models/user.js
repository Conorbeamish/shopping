const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

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
});

//Hash and Salt
userSchema.pre("save", async function(next){
  try{
      if(!this.isModified("password")){
          return next();
      }
      let hashedPassword = await bcrypt.hash(this.password, 10);
      this.password = hashedPassword
      return next();
  } catch (err){
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