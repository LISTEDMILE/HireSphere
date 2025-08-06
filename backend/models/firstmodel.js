const UserEmployee = require("../models/userEmployee");
const UserRecruiter = require("../models/userRecruiter");
const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  jobUploader: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserRecruiter",
  },
  jobCompany: {
    type: String,
    required: [true, "Job Company is required"],
  },
  jobPost: {
    type: String,
    required: [true, "Job Post is required"],
  },
  jobLocation: {
    type: String,
    required: [true, "Job Location is required"],
  },
  jobOwnerMobile: {
    type: String,
    required: [true, "Job Owner Mobile is required"],
  },
  jobOwnerEmail: {
    type: String,
    required: [true, "Job Owner Email is required"],
  },
  jobSalaryOffered: {
    type: String,
  },
  jobEmploymentType: [
    {
      type: String,
      enum: [
        "Full-Time",
        "Part-Time",
        "Internship",
        "Contract",
        "Freelance",
        "Temporary",
        "Remote",
        "Hybrid",
      ],
    },
  ],
  jobExperienceRequired: {
    type: String,
  },
  jobSkills: [{ type: String }],
  jobCompanyLogo: {
    type: String,
  },
  jobType: [
    {
      type: String,
      enum: ["Onsite", "Remote", "Hybrid"],
    },
  ],
  jobIndustry: {
    type: String,
  },
  jobTags: [{ type: String }],

  description: {
    type: String,
    required: [true, "Job Description is required"],
  },
});

jobSchema.pre("findOneAndDelete", async function (next) {
  const jobId = new mongoose.Types.ObjectId(this.getQuery()["_id"]);
  await UserRecruiter.findOneAndUpdate(
    { jobsPosted: jobId },
    { $pull: { jobsPosted: jobId } }
  );
  await UserEmployee.findOneAndUpdate(
    { favourites: jobId },
    { $pull: { favourites: jobId } }
  );
  await UserEmployee.findOneAndUpdate(
    { "appliedJobs.Ids": jobId },
    { $pull: { appliedJobs: { Ids: jobId } } }
  );
  await UserRecruiter.findOneAndUpdate(
    { "applications.job": jobId },
    { $pull: { applications: { job: jobId } } }
  );
  await UserRecruiter.findOneAndUpdate(
    { acceptedJobs: jobId },
    { $pull: { acceptedJobs: jobId } }
  );
  await UserRecruiter.findOneAndUpdate(
    { rejectedJobs: jobId },
    { $pull: { rejectedJobs: jobId } }
  );
  next();
});

module.exports = mongoose.model("Job", jobSchema);
