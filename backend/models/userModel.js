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
  ],profilesPosted: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
    },
  ],
  favourites: [
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
  appliedJobs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
    },
  ],
  choosenProfiles: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Profile",
    },
  ],

 
  applications: [{
    job:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
    },
    applierProfile: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
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
  acceptedProfiles: [
    { type: mongoose.Schema.Types.ObjectId,
      ref: "Profile",
    },
  ],

  offers: [
    {profile: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Profile",
    },
    status: {
      type: String,
      enum: ['pending', 'accepted', 'rejected', 'ignored'],
      default: 'pending',
      },
    offeredBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    }],

  acceptedOffers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Profile",
    },
  ],
  rejectedOffers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Profile",
    },
  ],

}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);