const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
  name: String,
  email: {
    type:String,
    unique: true
  }, 
  password: { type: String, required: true},
  date: { type: Date, default: Date.now }

});


module.exports = mongoose.model('User',UserSchema) //model