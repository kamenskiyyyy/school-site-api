const mongoose = require('mongoose');

const NavSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  path: {
    type: String,
    unique: false,
    required: false,
    sparse: true
  },
  dropMenu: {
    type: mongoose.Schema.Types.Mixed,
    required: false,
    unique: false,
    sparse: true,
  },
});

module.exports = mongoose.model('nav', NavSchema);
