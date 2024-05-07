const express = require("express");
const db = require("../models/index");
const jwt = require("jsonwebtoken");
const router = express.Router();

const signUp = async function(req, res, next){
  try {
    let user = await db.User.create(req.body);
    let {id, username} = user
    let token = jwt.sign({
        id,
        username
    }, 
    process.env.SECRET_KEY
    );
    return res.status(200).json({
        id, 
        username, 
        token
    });
  } catch (err){
    //Validation fails, not unique
    if(err.code === 11000){
        err.message = "Username taken";
    } else {
        err.message = "Please enter all fields to sign up";
    }
    return next({
        status: 400,
        message: err.message
    });
  }
}

const signIn = async function(req, res, next){
  try{
    let user = await db.User.findOne({
      username : req.body.username
    });
    let {id, username} = user;
    let isMatch =  await user.comparePassword(req.body.password);
    if(isMatch){
      let token = jwt.sign(
        {
          id, 
          username
        },
        process.env.SECRET_KEY
      );
      return res.status(200).json({
        id,
        username, 
        token
      });
    } else {
      return next({
        status: 400,
        message: "Invalid Email/Password"
      });
    }
  } catch {
    return next ({status: 400, message: "Invalid Username/Password"})
  }
}

router.post("/signup", signUp);
router.post("/signin", signIn);

module.exports = router;