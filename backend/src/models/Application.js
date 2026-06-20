const mongoose = require('mongoose');

const ApplicationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  schemeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Scheme', required: true },
  schemeName: { type: String, required: true },
  progress: {
    type: String,
    enum: ['not_started', 'in_progress', 'submitted', 'completed'],
    default: 'not_started'
  },
  currentStage: { type: String, default: 'Draft' },
  deadline: { type: Date, required: true },
  daysLeft: { type: Number },
  documentsUploaded: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Document' }],
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' }
}, {
  timestamps: true
});

module.exports = mongoose.model('Application', ApplicationSchema);
