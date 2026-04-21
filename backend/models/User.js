const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  googleId: {
    type: String,
    unique: true,
    sparse: true,
  },
  name: {
    type: String,
  },
  savedLocations: [
    {
      city: String,
      country: String,
      lat: Number,
      lon: Number,
    },
  ],
}, {
  timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
