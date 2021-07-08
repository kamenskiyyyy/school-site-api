const mongoose = require('mongoose');

const PagesSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
    unique: true
  },
  isPublic: {
    type: mongoose.Schema.Types.Boolean,
    required: true,
  },
});

module.exports = mongoose.model('pages', PagesSchema);
