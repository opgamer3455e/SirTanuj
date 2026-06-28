const mongoose = require('mongoose');

const StudyMaterialSchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: { type: String, enum: ['PDF', 'Video'], required: true },
  category: { type: String, required: true }, // e.g. Grammar, Poetry, Prose, Writing
  classLevel: { type: String, required: true }, // e.g. "Class 9", "Class 10"
  fileUrl: { type: String, default: '' },
  size: { type: String, default: '' }, // e.g. "2.4 MB"
  duration: { type: String, default: '' }, // e.g. "15 mins"
  featured: { type: Boolean, default: false },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

module.exports = mongoose.model('StudyMaterial', StudyMaterialSchema);
