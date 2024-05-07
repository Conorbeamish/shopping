const mongoose = require("mongoose");
mongoose.Promise = Promise;
mongoose.set("debug", false);

mongoose.connect(process.env.MONGO_DB_URI || "mongodb://localhost/shopping", {

})
.then(() => console.log("Connected to DB"))
.catch(err => console.log(err));

module.exports.User = require("./user");