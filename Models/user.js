// Create UserSchema

const mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
    firstName:  {
        type:String,
        required: true,
    },
    lastName: {
        type:String,
        required: true,
    },
    age:Number,
    email:{
    type: String,
      required: true,
      unique:true,
      dropDups: true //Remove Duplicate email to be unique
  }
  })
module.exports = mongoose.model('User', userSchema)