const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, enum: ['deadline', 'reminder', 'update'], default: 'deadline' },
  title: { type: String, required: true },
  message: { type: String, required: true },
  deadline: { type: Date },
  sent: { type: Boolean, default: false },
  sentAt: { type: Date }
}, {
  timestamps: true
});

module.exports = mongoose.model('Notification', NotificationSchema);
