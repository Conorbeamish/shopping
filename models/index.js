const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    mongoose.Promise = Promise;
    mongoose.set("debug", false);
    await mongoose.connect(process.env.MONGO_DB_URI || "mongodb://localhost/shopping", {});
    console.log("Connected to DB");
  } catch (err) {
    console.error("Error connecting to DB:", err);
  }
};

module.exports = {
  connectDB,
  User: require("./user"),
  Item: require("./item")
};
