const mongoose = require('mongoose');

const NavSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  path: {
    type: String,
    required: false,
    unique: true
  },
  dropMenu: {
    name: {
      type: String,
      required: false,
    },
    path: {
      type: String,
      required: false,
      unique: true
    },
  },
});

module.exports = mongoose.model('nav', NavSchema);
