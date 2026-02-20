const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user"
  },
  profileImage: {
    type: String,
    default: "https://i.ibb.co/4pDNDk1/avatar.png"
  },

  otp: String,
  otpExpire: Date,

  isOtpVerified: {
    type: Boolean,
    default: false,
  },

  isEmailVerified: {
    type: Boolean,
    default: false,
  },

  otpLastSentAt: Date,
});

module.exports = mongoose.model("User", userSchema);
