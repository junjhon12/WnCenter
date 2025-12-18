const mongoose = require('mongoose');

const ChapterSchema = new mongoose.Schema({
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'project',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  chapterNumber: {
    type: Number
  },
  aiGrade: {
    type: Number, // We'll store a score (e.g., 0-100) here later
    default: 0
  },
  aiSuggestions: [
    {
      text: String,
      type: String, // e.g., 'grammar', 'pacing', 'tone'
      location: Number // character index for highlighting
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('chapter', ChapterSchema);