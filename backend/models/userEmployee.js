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
    required: [true, "Username is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  userType: {
    type: String,
    required: [true, "User type is required"],
    enum: ['employee'],
  },
  profilesPosted: [
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
  appliedJobs: [{
    Ids:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job",
    },
   status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected', 'ignored'],
    default: 'pending',
    },
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
      ref: "UserRecruiter",
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

module.exports = mongoose.model('UserEmployee', userSchema);