const mongoose = require("mongoose");

const { Schema } = mongoose;

// make dog schema

const dogSchema = new Schema({
  name: String,
  breed: String,
  age: Number,
  doesTricks: Boolean,
  color: String
});

// make model

const dogModel = mongoose.model("Dog", dogSchema);

module.exports = dogModel;