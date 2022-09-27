const mongoose = require("mongoose");
const { USER_MONGO, PASS_MONGO, HOST_MONGO, PORT_MONGO, DB_MONGO } =
  require("dotenv").config().parsed;

const mongoURI = `mongodb://${USER_MONGO}:${PASS_MONGO}@${HOST_MONGO}:${PORT_MONGO}/${DB_MONGO}`;

mongoose
  .connect(mongoURI)
  .then(() =>
    console.log("Connection with MongoDB has been established successfully.")
  )
  .catch((error) => console.error("Unable to connect to the MongoDB:", error));

module.exports = mongoose;
