const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: [true, "First name is required"],
   
    },
    lastname: {
        type: String,
        required: [true, "Last name is required"],
    },
  username: {
    type: String,
    required: [true,"Username is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  userType: {
      type: String,
      required: [true, "User type is required"],
    enum: ['employee', 'recruiter'],
  },
  jobsPosted: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
    },
  ],
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);