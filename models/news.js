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
    unique: true
  },
  categories: {
    type: String,
    required: true,
  },
  preview: {
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
});

module.exports = mongoose.model('newsItem', NewsItemSchema);
