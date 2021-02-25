const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  username: { type: String, unique: true, lowercase: true },
  password: String,
});

const Admin = mongoose.model('User', userSchema);

module.exports = Admin;
