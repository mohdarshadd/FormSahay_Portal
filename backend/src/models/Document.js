const mongoose = require('mongoose');

const DocumentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, required: true }, // Aadhaar, IncomeCertificate, Domicile, CasteCertificate, etc.
  fileName: { type: String, required: true },
  fileSize: { type: Number, required: true },
  fileType: { type: String, required: true }, // pdf, image
  uploadDate: { type: Date, default: Date.now },
  status: { type: String, enum: ['verified', 'partial', 'missing', 'expired'], default: 'missing' },
  verificationDetails: {
    fields: {
      name: { type: Boolean, default: false },
      id: { type: Boolean, default: false },
      date: { type: Boolean, default: false }
    },
    validity: {
      valid: { type: Boolean, default: false },
      expires: { type: Date }
    },
    issues: [{ type: String }]
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Document', DocumentSchema);
