const Job = require("../models/firstmodel");
const UserEmployee = require("../models/userEmployee");
const UserRecruiter = require("../models/userRecruiter");
const { check, validationResult } = require("express-validator");

const Profile = require("../models/firstProfilemodel");

exports.addJobPost = [
  check("jobCompany").notEmpty().withMessage("Job Company is required").trim(),
  check("jobPost").notEmpty().withMessage("Job Post is required").trim(),
  check("jobLocation")
    .notEmpty()
    .withMessage("Job Location is required")
    .trim(),
  check("jobOwnerMobile")
    .notEmpty()
    .withMessage("Job Owner Mobile is required")
    .isLength({ min: 10, max: 10 })
    .withMessage("Mobile number must be 10 digits")
    .isNumeric()
    .withMessage("Mobile number must contain only digits")
    .trim(),
  check("jobOwnerEmail")
    .notEmpty()
    .withMessage("Job Owner Email is required")
    .isEmail()
    .withMessage("Invalid email format")
    .normalizeEmail(),
  check("description")
    .notEmpty()
    .withMessage("Job Description is required")
    .trim(),
  check("jobSkills").isArray({ min: 1 }).withMessage("Add Skills"),

  async (req, res) => {
    const errors = validationResult(req);
    const jobToAdd = req.body;

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array().map((err) => err.msg),
        oldInput: { ...jobToAdd },
      });
    }

    try {
      const user = await UserRecruiter.findById(req.session.user._id);

      if (!user) {
        return res.status(404).json({ errors: ["User not found"] });
      }

      if (user.userType !== "recruiter") {
        return res
          .status(403)
          .json({ errors: ["Access denied. Only recruiters can post jobs."] });
      }

      let savedJob;

      let existingJob = await Job.findById(jobToAdd._id);
      if (existingJob) {
        existingJob.jobUploader = user._id;
        existingJob.jobCompany = jobToAdd.jobCompany;
        existingJob.jobPost = jobToAdd.jobPost;
        existingJob.jobLocation = jobToAdd.jobLocation;
        existingJob.jobOwnerMobile = jobToAdd.jobOwnerMobile;
        existingJob.jobOwnerEmail = jobToAdd.jobOwnerEmail;
        existingJob.jobSalaryOffered = jobToAdd.jobSalaryOffered;
        existingJob.jobEmploymentType = jobToAdd.jobEmploymentType;
        existingJob.jobExperienceRequired = jobToAdd.jobExperienceRequired;
        existingJob.jobSkills = jobToAdd.jobSkills;
        existingJob.jobCompanyLogo = jobToAdd.jobCompanyLogo;
        existingJob.jobType = jobToAdd.jobType;
        existingJob.jobIndustry = jobToAdd.jobIndustry;
        existingJob.jobTags = jobToAdd.jobTags;
        existingJob.description = jobToAdd.description;
        savedJob = await existingJob.save();
      } else {
        const job = new Job({ ...jobToAdd, jobUploader: user._id });

        savedJob = await job.save();
      }

      user.jobsPosted.push(savedJob._id);
      await user.save();

      return res.status(201).json({ message: "Post Added Successfully" });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ errors: ["Something went wrong"] });
    }
  },
];

exports.postAddAboutRecruiter = [
  // check("jobCompany").notEmpty().withMessage("Job Company is required").trim(),
  // check("jobPost").notEmpty().withMessage("Job Post is required").trim(),
  // check("jobLocation")
  //   .notEmpty()
  //   .withMessage("Job Location is required")
  //   .trim(),
  // check("jobOwnerMobile")
  //   .notEmpty()
  //   .withMessage("Job Owner Mobile is required")
  //   .trim(),
  // check("jobOwnerEmail")
  //   .notEmpty()
  //   .withMessage("Job Owner Email is required")
  //   .isEmail()
  //   .withMessage("Invalid email format")
  //   .normalizeEmail(),
  // check("description")
  //   .notEmpty()
  //   .withMessage("Job Description is required")
  //   .trim(),

  async (req, res) => {
    const errors = validationResult(req);
    const data = req.body;

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array().map((err) => err.msg),
        oldInput: {
          ...data,
        },
      });
    }

    try {
      const user = await UserRecruiter.findById(req.session.user._id);

      if (!user) {
        return res.status(404).json({ errors: ["User not found"] });
      }

      if (user.userType !== "recruiter") {
        return res
          .status(403)
          .json({ errors: ["Access denied. Only Recruiters can update."] });
      }

      user.aboutRecruiter = {
        ...data,
      };

      await user.save();

      return res.status(201).json({ message: "Profile Updated Successfully" });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ errors: ["Something went wrong"] });
    }
  },
];

exports.getEditJob = async (req, res, next) => {
  const user = await UserRecruiter.findById(req.session.user._id);

  if (!user) {
    return res.status(404).json({ errors: ["User not found"] });
  }
  const jobId = req.params.jobId;
  if (!jobId) {
    return res.status(400).send({ error: "Job ID is required" });
  }

  if (!user.jobsPosted.includes(jobId)) {
    return res.status(400).json({ error: "Unautorized Access" });
  } else {
    Job.findById(jobId)
      .then((job) => {
        if (!job) {
          return res.status(404).send("Job not found");
        } else {
          res.status(200).json({
            _id: job._id,
            jobCompany: job.jobCompany,
            jobPost: job.jobPost,
            jobLocation: job.jobLocation,
            jobOwnerMobile: job.jobOwnerMobile,
            jobOwnerEmail: job.jobOwnerEmail,
            jobSalaryOffered: job.jobSalaryOffered,
            jobEmploymentType: job.jobEmploymentType,
            jobExperienceRequired: job.jobExperienceRequired,
            jobSkills: job.jobSkills,
            jobCompanyLogo: job.jobCompanyLogo,
            jobType: job.jobType,
            jobIndustry: job.jobIndustry,
            jobTags: job.jobTags,
            description: job.description,
          });
        }
      })
      .catch((err) => {
        console.error("Error fetching job details:", err);
        res.status(500).json({ error: "Failed to fetch job details" });
      });
  }
};

exports.getAddAboutRecruiter = async (req, res, next) => {
  const userId = req.params.userId;

  const user = await UserRecruiter.findById(userId);
  if (!user) {
    return res.status(400).json({ error: "Unauthorized access" });
  } else {
    return res.status(200).json(user.aboutRecruiter);
  }
};

exports.getAboutEmployee = async (req, res, next) => {
  const userId = req.params.userId;

  const user = await UserEmployee.findById(userId);
  if (!user) {
    return res.status(400).json({ error: "Unauthorized access" });
  } else {
    return res.status(200).json(user.aboutEmployee);
  }
};

exports.getApplications = async (req, res, next) => {
  if (!req.session || !req.session.user || !req.session.user._id) {
    return res.status(401).json({ error: "Unauthorized: Please log in first" });
  }
  try {
    const user = await UserRecruiter.findById(
      req.session.user._id,
      "applications"
    );
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const applicationIds = user.applications;
    if (!applicationIds) {
      return res
        .status(404)
        .json({ error: "No applications found for this user" });
    }

    const applications = await Promise.all(
      applicationIds.map(async (detail) => {
        let job = await Job.findById(detail.job);
        let applier = await UserEmployee.findById(detail.applierProfile);
        if (!job || !applier) {
          console.error("Job or Applier not found for ID:", detail);
          return null; // Skip this application if job or applier is not found
        }
        return {
          job: job,
          applierProfile: applier,
          status: detail.status,
        };
      })
    );
    const filteredApplications = applications.filter(
      (app) => !app.applierProfile == []
    ); // Remove any null entries
    return res.status(200).json({
      message: "Applications fetched successfully",
      applications: filteredApplications,
    });
  } catch (error) {
    console.error("Error fetching applications:", error);
    res.status(500).json({ error: "Failed to fetch applications" });
  }
};

exports.ignoreApplication = async (req, res, next) => {
  const jobId = req.params.jobId;
  if (!req.session || !req.session.user || !req.session.user._id) {
    return res.status(401).json({ error: "Unauthorized: Please log in first" });
  }
  try {
    const user = await UserRecruiter.findById(req.session.user._id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const application = user.applications.find(
      (app) => app.job.toString() === jobId
    );
    user.applications = user.applications.filter(
      (app) => app.job.toString() !== jobId
    );
    const userEmployee = await UserEmployee.findById(
      application.applierProfile
    );
    userEmployee.appliedJobs = userEmployee.appliedJobs.map((appl) => {
      if (appl.Ids == jobId) {
        return { ...appl, status: "ignored" };
      } else {
        return appl;
      }
    });
    user.acceptedJobs = user.acceptedJobs.filter(
      (job) => job.toString() !== jobId
    );
    user.rejectedJobs = user.rejectedJobs.filter(
      (job) => job.toString() !== jobId
    );
    await userEmployee.save();
    await user.save();
    return res
      .status(200)
      .json({ message: "Application ignored successfully" });
  } catch (error) {
    console.error("Error ignoring application:", error);
    return res.status(500).json({ error: "Failed to ignore application" });
  }
};

exports.acceptApplication = async (req, res, next) => {
  const jobId = req.params.jobId;
  if (!req.session || !req.session.user || !req.session.user._id) {
    return res.status(401).json({ error: "Unauthorized: Please log in first" });
  }
  try {
    const user = await UserRecruiter.findById(req.session.user._id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const application = user.applications.find(
      (app) => app.job.toString() === jobId
    );
    if (!application) {
      return res.status(404).json({ error: "Application not found" });
    }
    application.status = "accepted"; // Mark the application as accepted
    const userEmployee = await UserEmployee.findById(
      application.applierProfile
    );
    if (!userEmployee) {
      return res.status(404).json({ error: "Applier not found" });
    }
    if (!user.acceptedJobs.includes(jobId)) {
      user.acceptedJobs.push(jobId); // Add the job to the accepted jobs of the applier
    }
    if (user.rejectedJobs.includes(jobId)) {
      user.rejectedJobs = user.rejectedJobs.filter(
        (job) => job.toString() !== jobId
      ); // Remove the job from rejected jobs if it was rejected
    }
    userEmployee.appliedJobs = userEmployee.appliedJobs.map((appl) => {
      if (appl.Ids == jobId) {
        return { ...appl, status: "accepted" };
      } else {
        return appl;
      }
    });
    await userEmployee.save();
    await user.save();
    return res
      .status(200)
      .json({ message: "Application accepted successfully" });
  } catch (error) {
    console.error("Error accepting application:", error);
    return res.status(500).json({ error: "Failed to accept application" });
  }
};

exports.rejectApplication = async (req, res, next) => {
  const jobId = req.params.jobId;
  if (!req.session || !req.session.user || !req.session.user._id) {
    return res.status(401).json({ error: "Unauthorized: Please log in first" });
  }
  try {
    const user = await UserRecruiter.findById(req.session.user._id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const application = user.applications.find(
      (app) => app.job.toString() === jobId
    );
    if (!application) {
      return res.status(404).json({ error: "Application not found" });
    }
    application.status = "rejected"; // Mark the application as rejected
    const userEmployee = await UserEmployee.findById(
      application.applierProfile
    );
    if (!userEmployee) {
      return res.status(404).json({ error: "Applier not found" });
    }
    if (user.acceptedJobs.includes(jobId)) {
      user.acceptedJobs = user.acceptedJobs.filter(
        (job) => job.toString() !== jobId
      ); // Remove the job from accepted jobs if it was accepted
    }

    if (!user.rejectedJobs.includes(jobId)) {
      user.rejectedJobs.push(jobId); // Add the job to the rejected jobs of the applier
    }
    userEmployee.appliedJobs = userEmployee.appliedJobs.map((appl) => {
      if (appl.Ids == jobId) {
        return { ...appl, status: "rejected" };
      } else {
        return appl;
      }
    });

    await userEmployee.save();
    await user.save();
    res.status(200).json({ message: "Application rejected successfully" });
  } catch (error) {
    console.error("Error rejecting application:", error);
    return res.status(500).json({ error: "Failed to reject application" });
  }
};

exports.postEditJob = (req, res, next) => {
  const job = new Job(
    req.body.jobCompany,
    req.body.jobPost,
    req.body.jobLocation,
    req.body.jobOwnerMobile,
    req.body.jobOwnerEmail,
    req.body.description,
    req.body._id
  );
  job
    .save()
    .then(() => {
      res.redirect("/host/hostJobList");
    })
    .catch((err) => {
      console.error("Error saving job:", err);
    });
};

exports.hostJobList = async (req, res, next) => {
  try {
    if (!req.session || !req.session.user || !req.session.user._id) {
      return res
        .status(401)
        .json({ error: "Unauthorized: Please log in first" });
    }
    const jobProvider = await UserRecruiter.findById(
      req.session.user._id,
      "jobsPosted"
    );
    jobList = jobProvider.jobsPosted;

    const jobs = await Job.find({
      _id: { $in: jobList },
    });
    return res.status(200).json(jobs);
  } catch (error) {
    console.error("Error fetching users:", error);
  }
};

exports.getHostJobDetails = async (req, res, next) => {
  try {
    if (!req.session || !req.session.user || !req.session.user._id) {
      return res
        .status(401)
        .json({ error: "Unauthorized: Please log in first" });
    }
    const jobProvider = await UserRecruiter.findById(
      req.session.user._id,
      "jobsPosted"
    );
    jobList = jobProvider.jobsPosted;
    const jobId = req.params.jobId;

    const job = await Job.findById(jobId);
    return res.status(200).json(job);
  } catch (error) {
    console.error("Error fetching users:", error);
  }
};

exports.postDeleteJob = async (req, res, next) => {
  const jobId = req.params.jobId;

  try {
    const result = await Job.findByIdAndDelete(jobId);

    if (!result) {
      return res.status(404).json({ message: "Job not found" });
    }
    res
      .status(200)
      .json({ message: "Job deleted successfully", jobId: result._id });
  } catch (error) {
    console.error("Error deleting job:", error);
    res.status(500).json({ error: "Failed to delete job" });
  }
};

exports.profileList = (req, res, next) => {
  Profile.find()
    .then((profiles) => {
      res.status(200).json({
        message: "Profiles fetched successfully",
        profiles: profiles,
      });
    })
    .catch((err) => {
      console.error("Error fetching profiles:", err);
      res.status(500).json({ error: "Failed to fetch profiles" });
    });
};

exports.getHostProfileDetails = (req, res, next) => {
  Profile.findById(req.params.profileId)
    .then((profile) => {
      res.status(200).json({
        message: "Profile fetched successfully",
        profile: profile,
      });
    })
    .catch((err) => {
      console.error("Error fetching profiles:", err);
      res.status(500).json({ error: "Failed to fetch profiles" });
    });
};

exports.getProfileFavourites = (req, res, next) => {
  const favs = UserRecruiter.findById(req.session.user._id)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      return res.status(200).json({
        message: "Favourites fetched successfully",
        favIds: user.profileFavourites,
      });
    })
    .catch((err) => {
      console.error("Error fetching favourites:", err);
      return res.status(500).json({ error: "Failed to fetch favourites" });
    });
};

exports.getOnlyProfileFavourites = async (req, res, next) => {
  try {
    if (!req.session || !req.session.user || !req.session.user._id) {
      return res
        .status(401)
        .json({ error: "Unauthorized: Please log in first" });
    }
    const favs = await UserRecruiter.findById(
      req.session.user._id,
      "profileFavourites"
    );
    let favIds = favs.profileFavourites;
    const profiles = await Profile.find({
      _id: { $in: favIds },
    });
    return res.status(200).json(profiles);
  } catch (error) {
    console.error("Error fetching favourites:", error);
  }
};

exports.postAddProfileFavourites = async (req, res, next) => {
  const profileId = req.params.profileId;
  try {
    const user = await UserRecruiter.findById(req.session.user._id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    } else if (user.userType !== "recruiter") {
      return res
        .status(403)
        .json({ error: "Access denied. Only recruiters can add favourites." });
    }

    if (user.profileFavourites.includes(profileId)) {
      user.profileFavourites.pull(profileId);
      await user.save();
      return res
        .status(200)
        .json({ message: "Profile removed from favourites" });
    } else {
      user.profileFavourites.push(profileId);
      await user.save();
      return res.status(200).json({ message: "Profile added to favourites" });
    }
  } catch (error) {
    console.error("Error updating favourites:", error);
    return res.status(500).json({ error: "Failed to update favourites" });
  }
};

exports.getOnlyChoosenProfiles = async (req, res, next) => {
  try {
    if (!req.session || !req.session.user || !req.session.user._id) {
      return res
        .status(401)
        .json({ error: "Unauthorized: Please log in first" });
    }
    const user = await UserRecruiter.findById(
      req.session.user._id,
      "choosenProfiles"
    );
    let choosenProfileIds = user.choosenProfiles.map((ids) => ids.Ids);
    let profiles = await Profile.find({
      _id: { $in: choosenProfileIds },
    });
    let status;
    profiles = profiles.map((ele) => {
      user.choosenProfiles.forEach((e) => {
        if (e.Ids.toString() === ele._id.toString()) {
          status = e.status;
        }
      });
      return { ...ele, status: status };
    });
    return res.status(200).json(profiles);
  } catch (error) {
    console.error("Error fetching choosen profiles:", error);
  }
};

exports.postHireProfile = async (req, res, next) => {
  const profileId = req.params.profileId;
  try {
    const user = await UserRecruiter.findById(req.session.user._id);
    const userEmployee = await UserEmployee.findOne({
      profilesPosted: profileId,
    });
    if (!user) {
      return res.status(404).json({ error: "User or Employee not found" });
    } else if (user.userType !== "recruiter") {
      return res
        .status(403)
        .json({ error: "Access denied. Only recruiters can hire profiles." });
    }
    if (!userEmployee) {
      return res.status(404).json({ error: "Profile not found" });
    } else if (userEmployee.userType !== "employee") {
      return res
        .status(403)
        .json({ error: "Access denied. Only employees can be hired." });
    }

    let choosenIds = user.choosenProfiles.map((pro) => pro.Ids.toString());
    if (choosenIds.includes(profileId.toString())) {
      user.choosenProfiles = user.choosenProfiles.filter(
        (pro) => pro.Ids.toString() !== profileId.toString()
      );
      userEmployee.offers.pull({ profile: profileId, offeredBy: user._id });
      userEmployee.acceptedOffers.pull(profileId);
      userEmployee.rejectedOffers.pull(profileId);
      await userEmployee.save();
      await user.save();
      return res
        .status(200)
        .json({ message: "Profile removed from choosen profiles" });
    } else {
      user.choosenProfiles.push({ Ids: profileId, status: "pending" });
      userEmployee.offers.push({
        profile: profileId,
        offeredBy: user._id,
        status: "pending",
      });
      await userEmployee.save();
      await user.save();
      return res
        .status(200)
        .json({ message: "Profile added to choosen profiles" });
    }
  } catch (error) {
    console.error("Error updating choosen profiles:", error);
    return res.status(500).json({ error: "Failed to update choosen profiles" });
  }
};

exports.getChoosenProfiles = async (req, res, next) => {
  const user = await UserRecruiter.findById(req.session.user._id)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      return res.status(200).json({
        message: "Choosen profiles fetched successfully",
        choosenProfiles: user.choosenProfiles,
      });
    })
    .catch((err) => {
      console.error("Error fetching choosen profiles:", err);
      return res
        .status(500)
        .json({ error: "Failed to fetch choosen profiles" });
    });
};

exports.getApplicantProfiles = async (req, res, next) => {
  try {
    const applicantId = req.params.applicantId;
    const profilesAdder = await UserEmployee.findById(
      applicantId,
      "profilesPosted"
    );
    let profileIds = profilesAdder.profilesPosted;

    const profiles = await Profile.find({
      _id: { $in: profileIds },
    });
    return res.status(200).json(profiles);
  } catch (error) {
    console.error("Error fetching profiles:", error);
  }
};
