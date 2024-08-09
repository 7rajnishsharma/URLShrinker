const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

require('dotenv').config();  // Load environment variables

async function connectToMongoDB(url) {
  return mongoose.connect(url);
}

module.exports = {
  connectToMongoDB,
};
