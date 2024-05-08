const express = require("express");
const db = require("../models/index");
const jwt = require("jsonwebtoken");
const router = express.Router();

const signUp = async function(req, res, next) {
  try {
    // Check if password is at least 10 characters long
    if (req.body.password.length < 10) {
      throw new Error("Password must be at least 10 characters long");
    }

    // Continue with sign up process only if password is valid
    let user = await db.User.create(req.body);
    let { id, username } = user;
    let token = jwt.sign({ id, username }, process.env.SECRET_KEY);
    return res.status(200).json({ id, username, token });
  } catch (err) {
    // Handle validation errors
    let message;
    if (err.code === 11000) {
      message = "Username taken";
    } else {
      message = err.message;
    }
    return next({ status: 400, message });
  }
};



const signIn = async function(req, res, next) {
  try {
    let user = await db.User.findOne({
      username: req.body.username
    });

    if (!user) {
      return next({
        status: 400,
        message: "User not found"
      });
    }

    let { id, username } = user;

    let isMatch = await user.comparePassword(req.body.password);

    if (isMatch) {
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
  } catch (err) {
    console.error("Error signing in:", err);
    return next({ status: 500, message: "Internal Server Error" });
  }
};


router.post("/signup", signUp);
router.post("/signin", signIn);

module.exports = {
  router: router,
  signUp,
  signIn
};