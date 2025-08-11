const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
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
      enum: ["employee"],
    },
    aboutEmployee: {
      fullName: {
        type: String,
      },
      profilePicture: {
        type: String,
      },
      profession: {
        type: String,
      },
      location: {
        type: String,
      },
      email: {
        type: String,
      },
      linkedIn: {
        type: String,
      },
      gitHub: {
        type: String,
      },
      bio: {
        type: String,
      },
      mobile: {
        type: String,
      },
      education: [
        {
          degree: { type: String },
          college: { type: String },
          passingYear: { type: String },
          CGPA: { type: String },
        },
      ],
      skills: [{ type: String }],
      experience: [
        {
          company: { type: String },
          role: { type: String },
          duration: { type: String },
          descriptionWork: { type: String },
        },
      ],
      projects: [
        {
          title: { type: String },
          descriptionProject: { type: String },
          technologies: [{ type: String }],
          link: { type: String },
        },
      ],
      achievements: [{ type: String }],
      languageKnown: [{ type: String }],
      jobPreferences: [{ type: String }],
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
    appliedJobs: [
      {
        Ids: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Job",
        },
        status: {
          type: String,
          enum: ["pending", "accepted", "rejected", "ignored"],
          default: "pending",
        },
      },
    ],

    offers: [
      {
        profile: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Profile",
        },
        status: {
          type: String,
          enum: ["pending", "accepted", "rejected", "ignored"],
          default: "pending",
        },
        offeredBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "UserRecruiter",
        },
      },
    ],

   
  },
  { timestamps: true }
);

userSchema.pre("findOneAndDelete", async function (next) {
  
  const Profile = require("../models/firstProfilemodel");
  const userId = new mongoose.Types.ObjectId(this.getQuery()["_id"]);
  const profileIds = await Profile.find({profileUploader:userId});
 await Promise.all(profileIds.map(profileId =>  Profile.findByIdAndDelete(profileId._id)
  ));
  next();
})

module.exports = mongoose.model("UserEmployee", userSchema);
