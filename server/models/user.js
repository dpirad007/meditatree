const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  username: { type: String, unique: true, lowercase: true },
  password: String,
  division: { type: Number, default: 1, index: true },
  group_id: { type: mongoose.Types.ObjectId, ref: 'Group' },
  xp: {
    type: Number,
    default: 0,
  },
  streak: {
    last_session: {
      type: Date,
      default: new Date(631132200),
    },
    current_streak: {
      type: Number,
      default: 0,
    },
  },
  days: {
    type: Map,
    of: Boolean,
  },
  next_tutorial: {
    type: Number,
    default: 1,
  },
});

const Admin = mongoose.model('User', userSchema);

module.exports = Admin;
