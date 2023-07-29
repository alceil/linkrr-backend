const mongoose = require("mongoose");

const userShema = mongoose.Schema({
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  username: {
    type: String,
  },
  page:{
    type: Map,
    default: {} 
  },
});

const userModel = mongoose.model("userslinkrr", userShema);
module.exports= userModel;