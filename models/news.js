const mongoose = require('mongoose');
const validator = require('validator');

const NewsItemSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator(url) {
        return validator.isURL(url);
      },
    },
  },
  categories: {
    type: mongoose.Schema.Types.Array,
    required: true,
  },
  author: {
    type: String,
    required: true,
    ref: 'user',
  },
  date: {
    type: mongoose.Schema.Types.Date,
    required: true,
  }
});

module.exports = mongoose.model('newsItem', NewsItemSchema);
