const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  age: { type: Number, required: true },
  state: { type: String, required: true },
  category: { type: String, required: true }, // General, OBC, SC, ST, EWS, PwD
  income: { type: Number, required: true },
  education: { type: String, required: true },
  gender: { type: String, required: true },
  disability: { type: Boolean, default: false }
}, {
  timestamps: true
});

module.exports = mongoose.model('User', UserSchema);
