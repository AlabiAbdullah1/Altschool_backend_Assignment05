const mongoose = require("mongoose");
require("dotenv").config();

const URI = process.env.MONGODB_URI;

function connectToMongoDB() {
  mongoose.connect(URI);

  mongoose.connection.on("connected", () => {
    console.log("Database Connected Successfully!");
  });

  mongoose.connection.on("err", () => {
    console.log("An Error Occured!");
  });
}
module.exports = connectToMongoDB;
