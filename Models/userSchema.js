// 1) import mongoose
const mongoose = require("mongoose");

// 2) create schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  github: {
    type: String,
  },
  linkedin: {
    type: String,
  },
  profile: {
    type: String,
  },
});

// 3) create model
// mongoose.model() method is used to create model, it accepts two arguements
// 1.Name of the collection that needs to map with the model
// 2.The schema created 
const users = mongoose.model('users',userSchema)

// 4) export the model
module.exports = users;