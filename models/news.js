const mongoose = require('mongoose');

const NewsItemSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  guid: {
    type: String,
    required: true,
    unique: true,
  },
  categories: {
    type: String,
    required: true,
  },
  cover: {
    type: String,
    required: false,
  },
  author: {
    type: String,
    required: true,
    ref: 'user',
  },
  date: {
    type: mongoose.Schema.Types.Date,
    required: true,
  },
  isPublic: {
    type: mongoose.Schema.Types.Boolean,
    required: true,
  },
  isPreview: {
    type: mongoose.Schema.Types.Boolean,
    required: false,
  },
});

module.exports = mongoose.model('newsItem', NewsItemSchema);
