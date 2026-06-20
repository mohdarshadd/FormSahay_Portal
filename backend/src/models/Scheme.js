const mongoose = require('mongoose');

const SchemeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true }, // Scholarship, Agriculture, Pension, Health, Grant, etc.
  benefit: { type: String, required: true },
  eligibility: {
    ageRange: {
      min: { type: Number, default: 0 },
      max: { type: Number, default: 120 }
    },
    categories: [{ type: String }], // General, OBC, SC, ST, EWS, PwD
    incomeLimit: { type: Number },
    education: { type: String }, // Below 10th, 10th Pass, 12th Pass, Graduate, Post Graduate, etc.
    state: { type: String } // e.g. "All" or a specific Indian state
  },
  documentsRequired: [{ type: String }],
  deadline: { type: Date, required: true },
  contactInfo: {
    office: { type: String },
    phone: { type: String },
    email: { type: String }
  },
  instructions: [{ type: String }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Scheme', SchemeSchema);
