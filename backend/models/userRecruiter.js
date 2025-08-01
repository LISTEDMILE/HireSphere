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
    enum: [ 'recruiter'],
  },
  jobsPosted: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
    },
  ],
  profileFavourites: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
    },
  ],
  choosenProfiles: [{
    Ids:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Profile",
        },
       status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected', 'ignored'],
        default: 'pending',
        },
      },
      ],

 
  applications: [{
    job:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
    },
    applierProfile: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserEnployee",
    },
    status: {
      type: String,
      enum: ['pending', 'accepted', 'rejected'],
      default: 'pending',
    },
  }
  ],
  acceptedJobs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
    },
  ],
  rejectedJobs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
    },
  ],

}, { timestamps: true });

module.exports = mongoose.model('UserRecruiter', userSchema);