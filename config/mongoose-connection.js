const mongoose = require('mongoose');
const dbgr = require("debug")("development:mongoose");

// Use environment variable directly
const mongoURL = process.env.MONGO_URL;

mongoose
  .connect(`${mongoURL}/premiumbagshop`)
  .then(() => {
    dbgr("connected");
  })
  .catch((err) => {
    dbgr(err);
  });

module.exports = mongoose.connection;
