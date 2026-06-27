const mongoose = require('mongoose');

const LessonSchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: { type: String, enum: ['VIDEO', 'PDF', 'QUIZ'], required: true },
  contentUrl: { type: String, required: true },
  duration: { type: Number }, // in minutes
  isRequired: { type: Boolean, default: true }
});

const ModuleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  order: { type: Number, required: true },
  lessons: [LessonSchema],
  // Extreme Customization: Drip and Prerequisites
  unlockDate: { type: Date, default: null }, // Drip scheduling
  prerequisiteModuleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Module', default: null } // Must complete previous module
});

const CourseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  thumbnailUrl: { type: String },
  instructorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  modules: [ModuleSchema],
  themeColor: { type: String, default: '#FC642D' }, // Portal Customization
  isPublished: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Course', CourseSchema);
