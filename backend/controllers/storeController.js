const Job = require("../models/firstmodel");
const UserEmployee = require("../models/userEmployee");
const UserRecruiter = require("../models/userRecruiter");
const { check, validationResult } = require("express-validator");
const Profile = require("../models/firstProfilemodel");
const path = require("path");
const fs = require("fs");

exports.jobList = (req, res, next) => {
  const details = Job.find()
    .then((details) => {
      res.status(200).json({
        message: "Job List fetched successfully",
        details: details,
      });
    })
    .catch((err) => {
      console.log("Error fetching job list", err);
      res.status(500).json({
        message: "Error fetching job list",
        error: err,
      });
    });
};

exports.getStoreJobDetails = (req, res, next) => {
  const detail = Job.findById(req.params.jobId)
    .then((detail) => {
      res.status(200).json({
        message: "Job List fetched successfully",
        detail: detail,
      });
    })
    .catch((err) => {
      console.log("Error fetching job list", err);
      res.status(500).json({
        message: "Error fetching job list",
        error: err,
      });
    });
};

exports.getStoreOffererJobs = async (req, res, next) => {
  const offererId = req.params.offererId;

  try {
    const jobProvider = await UserRecruiter.findById(offererId, "jobsPosted");
    jobList = jobProvider.jobsPosted;

    if (!jobProvider) {
      return res.status(404).json({ error: "User Not Found" });
    }

    const jobs = await Job.find({
      _id: { $in: jobList },
    });
    return res.status(200).json(jobs);
  } catch (error) {
    console.error("Error fetching users:", error);
  }
};

exports.getFavourites = (req, res, next) => {
  if (!req.session || !req.session.user || !req.session.user._id) {
    return res.status(401).json({ error: "Unauthorized: Please log in first" });
  }
  if (req.session.user.userType !== "employee") {
    return res.status(401).json({ error: "Unauthorized: User" });
  }
  const favs = UserEmployee.findById(req.session.user._id)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      return res.status(200).json({
        message: "Favourites fetched successfully",
        favIds: user.favourites,
      });
    })
    .catch((err) => {
      console.error("Error fetching favourites:", err);
      return res.status(500).json({ error: "Internal server error" });
    });
};

exports.getOffers = async (req, res, next) => {
  if (!req.session || !req.session.user || !req.session.user._id) {
    return res.status(401).json({ error: "Unauthorized: Please log in first" });
  }
  if (req.session.user.userType !== "employee") {
    return res.status(401).json({ error: "Unauthorized: User" });
  }
  try {
    const user = await UserEmployee.findById(req.session.user._id, "offers");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const offerIds = user.offers;
    if (!offerIds) {
      return res.status(404).json({ error: "No offers found" });
    }

    const offers = await Promise.all(
      offerIds.map(async (detail) => {
        const profile = await Profile.findById(detail.profile);
        let offeredBy = await UserRecruiter.findById(detail.offeredBy);
        if (!profile || !offeredBy) {
          return null; // Skip this offer if profile or offeredBy is not found
        }
        return {
          profile: profile,
          offeredBy: offeredBy,
          status: detail.status,
          _id: detail._id,
        };
      })
    );

    const filteredOffers = offers.filter((offer) => !offer.offeredBy == []);

    return res.status(200).json({
      message: "Offers fetched successfully",
      offers: filteredOffers,
    });
  } catch (error) {
    console.error("Error fetching offers:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.ignoreOffer = async (req, res, next) => {
  const offerId = req.params.offerId;
  if (!offerId || !req.session || !req.session.user || !req.session.user._id) {
    return res
      .status(400)
      .json({ error: "Profile ID is required or user not logged in" });
  }
  if (req.session.user.userType !== "employee") {
    return res.status(401).json({ error: "Unauthorized: User" });
  }
  try {
    const user = await UserEmployee.findById(req.session.user._id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const offer = user.offers.find((off) => off._id.toString() === offerId);

    user.offers = user.offers.filter(
      (offer) => offer._id.toString() !== offerId
    );
    const userRecruiter = await UserRecruiter.findById(offer.offeredBy);
    userRecruiter.choosenProfiles = userRecruiter.choosenProfiles.map((off) => {
      if (off.Ids.toString() == offer.profile.toString()) {
        return { ...off, status: "ignored" };
      } else {
        return off;
      }
    });
    await userRecruiter.save();
    await user.save();
    return res.status(200).json({ message: "Offer ignored successfully" });
  } catch (error) {
    console.error("Error ignoring offer:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.acceptOffer = async (req, res, next) => {
  const offerId = req.params.offerId;
  if (!offerId || !req.session || !req.session.user || !req.session.user._id) {
    return res
      .status(400)
      .json({ error: "Profile ID is required or user not logged in" });
  }
  if (req.session.user.userType !== "employee") {
    return res.status(401).json({ error: "Unauthorized: User" });
  }
  try {
    const user = await UserEmployee.findById(req.session.user._id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const offer = user.offers.find((offer) => offer._id.toString() === offerId);
    if (!offer) {
      return res.status(404).json({ error: "Offer not found" });
    }
    offer.status = "accepted";
    const userRecruiter = await UserRecruiter.findById(offer.offeredBy);
    if (!userRecruiter) {
      return res.status(404).json({ error: "Offer provider not found" });
    }

    userRecruiter.choosenProfiles = userRecruiter.choosenProfiles.map((off) => {
      if (off.Ids.toString() == offer.profile.toString()) {
        return { ...off, status: "accepted" };
      } else {
        return off;
      }
    });
    await userRecruiter.save();
    await user.save();
    return res.status(200).json({ message: "Offer accepted successfully" });
  } catch (error) {
    console.error("Error accepting offer:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.rejectOffer = async (req, res, next) => {
  const offerId = req.params.offerId;
  if (!offerId || !req.session || !req.session.user || !req.session.user._id) {
    return res
      .status(400)
      .json({ error: "Profile ID is required or user not logged in" });
  }
  if (req.session.user.userType !== "employee") {
    return res.status(401).json({ error: "Unauthorized: User" });
  }
  try {
    const user = await UserEmployee.findById(req.session.user._id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const offer = user.offers.find((offer) => offer._id.toString() === offerId);
    if (!offer) {
      return res.status(404).json({ error: "Offer not found" });
    }
    offer.status = "rejected";
    const userRecruiter = await UserRecruiter.findById(offer.offeredBy);
    if (!userRecruiter) {
      return res.status(404).json({ error: "Offer provider not found" });
    }

    userRecruiter.choosenProfiles = userRecruiter.choosenProfiles.map((off) => {
      if (off.Ids.toString() == offer.profile.toString()) {
        return { ...off, status: "rejected" };
      } else {
        return off;
      }
    });
    await userRecruiter.save();
    await user.save();
    return res.status(200).json({ message: "Offer rejected successfully" });
  } catch (error) {
    console.error("Error rejecting offer:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.getAppliedJobs = (req, res, next) => {
  if (!req.session || !req.session.user || !req.session.user._id) {
    return res.status(401).json({ error: "Unauthorized: Please log in first" });
  }
  if (req.session.user.userType !== "employee") {
    return res.status(401).json({ error: "Unauthorized: User" });
  }

  const user = UserEmployee.findById(req.session.user._id)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      return res.status(200).json({
        message: "Applied jobs fetched successfully",
        appliedIds: user.appliedJobs,
      });
    })
    .catch((err) => {
      console.error("Error fetching applied jobs:", err);
      return res.status(500).json({ error: "Internal server error" });
    });
};

exports.getOnlyFavourites = async (req, res, next) => {
  try {
    if (!req.session || !req.session.user || !req.session.user._id) {
      return res
        .status(401)
        .json({ error: "Unauthorized: Please log in first" });
    }
    if (req.session.user.userType !== "employee") {
      return res.status(401).json({ error: "Unauthorized: User" });
    }
    const favs = await UserEmployee.findById(
      req.session.user._id,
      "favourites"
    );
    let favIds = favs.favourites;

    const jobs = await Job.find({
      _id: { $in: favIds },
    });
    return res.status(200).json(jobs);
  } catch (error) {
    console.error("Error fetching favourites:", error);
  }
};

exports.getOnlyAppliedJobs = async (req, res, next) => {
  try {
    if (!req.session || !req.session.user || !req.session.user._id) {
      return res
        .status(401)
        .json({ error: "Unauthorized: Please log in first" });
    }
    if (req.session.user.userType !== "employee") {
      return res.status(401).json({ error: "Unauthorized: User" });
    }
    const user = await UserEmployee.findById(
      req.session.user._id,
      "appliedJobs"
    );
    let appliedIds = user.appliedJobs.map((ids) => ids.Ids);
    let jobs = await Job.find({
      _id: { $in: appliedIds },
    });
    let status;
    jobs = jobs.map((ele) => {
      user.appliedJobs.forEach((e) => {
        if (e.Ids.toString() === ele._id.toString()) {
          status = e.status;
        }
      });
      return { ...ele, status: status };
    });
    return res.status(200).json(jobs);
  } catch (error) {
    console.error("Error fetching applied jobs:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.postAddFavourites = async (req, res, next) => {
  const jobId = req.params.jobId;
  if (!req.session || !req.session.user || !req.session.user._id) {
    return res.status(401).json({ error: "Unauthorized: Please log in first" });
  }
  if (req.session.user.userType !== "employee") {
    return res.status(401).json({ error: "Unauthorized: User" });
  }
  try {
    const user = await UserEmployee.findById(req.session.user._id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (user.favourites.includes(jobId)) {
      user.favourites.pull(jobId);
      await user.save();
      return res.status(200).json({ message: "Job removed from favourites" });
    } else {
      user.favourites.push(jobId);
      await user.save();
      return res.status(200).json({ message: "Job added to favourites" });
    }
  } catch (err) {
    console.error("Error updating favourites:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.postApply = async (req, res, next) => {
  const jobId = req.params.jobId;
  if (!req.session || !req.session.user || !req.session.user._id) {
    return res.status(401).json({ error: "Unauthorized: Please log in first" });
  }
  if (req.session.user.userType !== "employee") {
    return res.status(401).json({ error: "Unauthorized: User" });
  }
  try {
    const user = await UserEmployee.findById(req.session.user._id);
    const userhost = await UserRecruiter.findOne({ jobsPosted: jobId });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    if (!userhost) {
      return res.status(404).json({ error: "Job not found" });
    } else if (userhost.userType !== "recruiter") {
      return res
        .status(403)
        .json({ error: "Forbidden: Only recruiters can post jobs" });
    }

    let appliedIds = user.appliedJobs.map((app) => app.Ids.toString());

    if (appliedIds.includes(jobId.toString())) {
      user.appliedJobs = user.appliedJobs.filter(
        (app) => app.Ids.toString() !== jobId.toString()
      );
      userhost.applications.pull({ job: jobId, applierProfile: user._id });
      await userhost.save();
      await user.save();
      return res.status(200).json({ message: "Job application cancelled" });
    } else {
      user.appliedJobs.push({ Ids: jobId, status: "pending" });
      userhost.applications.push({
        job: jobId,
        applierProfile: user._id,
        status: "pending",
      });
      await userhost.save();
      await user.save();
      return res.status(200).json({ message: "Job applied successfully" });
    }
  } catch (err) {
    console.error("Error applying for job:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.addProfilePost = [
  check("profileName")
    .notEmpty()
    .withMessage("Profile Name is required")
    .trim(),
  check("profileGender")
    .notEmpty()
    .withMessage("Profile Gender is required")
    .trim(),
  check("profilePost")
    .notEmpty()
    .withMessage("Profile Post is required")
    .trim(),
  check("profileCourse")
    .notEmpty()
    .withMessage("Profile Course is required")
    .trim(),
  check("profileSkills")
    .notEmpty()
    .withMessage("Profile Skills is required")
    .trim(),
  check("profileEmail")
    .isEmail()
    .withMessage("Profile Email is required")
    .normalizeEmail(),
  check("profileMobile")
    .notEmpty()
    .withMessage("Profile Mobile is required")
    .trim(),
  check("profileTenth")
    .notEmpty()
    .withMessage("Profile Tenth is required")
    .trim(),
  check("profileTwelth")
    .notEmpty()
    .withMessage("Profile Twelth is required")
    .trim(),
  check("profileGraduation")
    .notEmpty()
    .withMessage("Profile Graduation is required")
    .trim(),
  check("profileDescription")
    .notEmpty()
    .withMessage("Profile Description is required")
    .trim(),
  check("profilePostDescription")
    .notEmpty()
    .withMessage("Profile Post Description is required")
    .trim(),

  async (req, res, next) => {
    const errors = validationResult(req);

    const profileToAdd = req.body;

    if (!req.session || !req.session.user || !req.session.user._id) {
      return res
        .status(401)
        .json({ error: "Unauthorized: Please log in first" });
    }
    if (req.session.user.userType !== "employee") {
      return res.status(401).json({ error: "Unauthorized: User" });
    }

    if (!errors.isEmpty()) {
      console.log("Validation errors:", errors.array());
      return res.status(400).json({
        message: "Validation failed",
        errors: errors.array().map((err) => err.msg),
        oldInput: { profileToAdd },
      });
    }

    try {
      const user = await UserEmployee.findById(req.session.user._id);
      if (!user) {
        return res.status(404).json({ errors: ["User not found"] });
      }

      let savedProfile;

      let existingProfile = await Profile.findById(profileToAdd._id);
      if (existingProfile) {
        existingProfile.profileUploader = user._id;
        existingProfile.profileName = profileToAdd.profileName;
        existingProfile.profileGender = profileToAdd.profileGender;
        existingProfile.profilePost = profileToAdd.profilePost;
        existingProfile.profileCourse = profileToAdd.profileCourse;
        existingProfile.profileSkills = profileToAdd.profileSkills;
        existingProfile.profileEmail = profileToAdd.profileEmail;
        existingProfile.profileMobile = profileToAdd.profileMobile;
        existingProfile.profileTenth = profileToAdd.profileTenth;
        existingProfile.profileTwelth = profileToAdd.profileTwelth;
        existingProfile.profileGraduation = profileToAdd.profileGraduation;
        existingProfile.profileExperience = profileToAdd.profileExperience;
        existingProfile.profileJobType = profileToAdd.profileJobType;
        existingProfile.profileExpectedSalary =
          profileToAdd.profileExpectedSalary;
        existingProfile.profilePreferredLocations =
          profileToAdd.profilePreferredLocations;
        existingProfile.profileProjects = profileToAdd.profileProjects;
        existingProfile.profileDescription = profileToAdd.profileDescription;
        existingProfile.profilePostDescription =
          profileToAdd.profilePostDescription;

        savedProfile = await existingProfile.save();
      } else {
        const newProfile = new Profile({
          ...profileToAdd,
          profileUploader: user._id,
        });
        savedProfile = await newProfile.save();
      }

      user.profilesPosted.push(savedProfile._id);
      await user.save();

      return res.status(201).json({
        message: "Profile added successfully",
      });
    } catch (error) {
      console.error("Error adding profile:", error);
      return res.status(500).json({ errors: ["Internal server error"] });
    }
  },
];

exports.postAddAboutEmployee = [
  async (req, res) => {
    const errors = validationResult(req);
    Object.keys(req.body).forEach((key) => {
      try {
        const value = req.body[key];
        if (
          typeof value === "string" &&
          (value.startsWith("[") || value.startsWith("{"))
        ) {
          req.body[key] = JSON.parse(value);
        }
      } catch (e) {
        console.warn(`Could not parse ${key}, setting to empty`, e);
        req.body[key] = [];
      }
    });

    const data = req.body;

    if (!req.session || !req.session.user || !req.session.user._id) {
      return res
        .status(401)
        .json({ error: "Unauthorized: Please log in first" });
    }
    if (req.session.user.userType !== "employee") {
      return res.status(401).json({ error: "Unauthorized: User" });
    }

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array().map((err) => err.msg),
        oldInput: { ...data },
      });
    }
    const user = await UserEmployee.findById(req.session.user._id);
    if (!user) {
      return res.status(404).json({ errors: ["User not found"] });
    }
    try {
      let profilePath;
      if (req.file) {
        profilePath = `/uploads/${req.file.filename}`;
        const oldImagePath = path.join(
          __dirname,
          `..${user.aboutEmployee.profilePicture}`
        );
        fs.unlink(oldImagePath, (error) => {
          if (error) {
            console.log("Error uploading image", error);
          }
        });
      } else if (user.aboutEmployee.profilePicture) {
        profilePath = user.aboutEmployee.profilePicture;
      } else {
        profilePath = null;
      }

      user.aboutEmployee = { ...data, profilePicture: profilePath };

      await user.save();
      return res.status(201).json({
        message: "Profile Updated Successfully",
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        errors: ["Something went wrong"],
      });
    }
  },
];

exports.getAddAboutEmployee = async (req, res, next) => {
  const userId = req.session.user._id;
  if (!req.session || !req.session.user || !req.session.user._id) {
    return res.status(401).json({ error: "Unauthorized: Please log in first" });
  }
  if (req.session.user.userType !== "employee") {
    return res.status(401).json({ error: "Unauthorized: User" });
  }
  const user = await UserEmployee.findById(userId);
  if (!user) {
    return res.status(400).json({ error: "Unauthorized access" });
  } else {
    return res.status(200).json(user.aboutEmployee);
  }
};

exports.getAboutRecruiter = async (req, res, next) => {
  try {
    const userId = req.params.userId;

    const user = await UserRecruiter.findById(userId);
    if (!user) {
      return res.status(400).json({ error: "Unauthorized access" });
    } else {
      return res.status(200).json(user.aboutRecruiter);
    }
  } catch (err) {
    console.log("Not Found", err);
  }
};

exports.getEditProfile = async (req, res, next) => {
  const profileId = req.params.profileId;
  if (!req.session || !req.session.user || !req.session.user._id) {
    return res.status(401).json({ error: "Unauthorized: Please log in first" });
  }
  if (req.session.user.userType !== "employee") {
    return res.status(401).json({ error: "Unauthorized: User" });
  }
  if (!profileId) {
    return res.status(400).json({ error: "Profile ID is required" });
  }
  const user = await UserEmployee.findById(req.session.user);
  if (!user || !user.profilesPosted.includes(profileId)) {
    return res.status(400).json({ error: "Unauthorized access" });
  } else {
    Profile.findById(profileId)
      .then((profile) => {
        if (!profile) {
          return res.status(404).json({ error: "Profile not found" });
        } else {
          res.status(200).json({
            _id: profile._id,
            profileName: profile.profileName,
            profileGender: profile.profileGender,
            profilePost: profile.profilePost,
            profileCourse: profile.profileCourse,
            profileSkills: profile.profileSkills,
            profileEmail: profile.profileEmail,
            profileMobile: profile.profileMobile,
            profileTenth: profile.profileTenth,
            profileTwelth: profile.profileTwelth,
            profileGraduation: profile.profileGraduation,
            profileExperience: profile.profileExperience,
            profileJobType: profile.profileJobType,
            profileExpectedSalary: profile.profileExpectedSalary,
            profilePreferredLocations: profile.profilePreferredLocations,
            profileProjects: profile.profileProjects,
            profileDescription: profile.profileDescription,
            profilePostDescription: profile.profilePostDescription,
          });
        }
      })
      .catch((error) => {
        console.error("Error fetching profile:", error);
        return res.status(500).json({ error: "Internal server error" });
      });
  }
};

exports.storeProfileList = async (req, res, next) => {
  try {
    if (!req.session || !req.session.user || !req.session.user._id) {
      return res
        .status(401)
        .json({ error: "Unauthorized: Please log in first" });
    }
    if (req.session.user.userType !== "employee") {
      return res.status(401).json({ error: "Unauthorized: User" });
    }
    const profilesAdder = await UserEmployee.findById(
      req.session.user._id,
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

exports.getStoreProfileDetails = async (req, res, next) => {
  try {
    if (!req.session || !req.session.user || !req.session.user._id) {
      return res
        .status(401)
        .json({ error: "Unauthorized: Please log in first" });
    }
    if (req.session.user.userType !== "employee") {
      return res.status(401).json({ error: "Unauthorized: User" });
    }
    const profilesAdder = await UserEmployee.findById(
      req.session.user._id,
      "profilesPosted"
    );
    let profileIds = profilesAdder.profilesPosted;

    if (!profileIds.includes(req.params.profileId)) {
      return res.status(404).json({ error: "You don't own this Resume" });
    }

    const profileId = req.params.profileId;

    const profile = await Profile.findById(profileId);
    return res.status(200).json(profile);
  } catch (error) {
    console.error("Error fetching profiles:", error);
  }
};

exports.postDeleteProfile = async (req, res, next) => {
  const profileId = req.params.profileId;
  if (!req.session || !req.session.user || !req.session.user._id) {
    return res.status(401).json({ error: "Unauthorized: Please log in first" });
  }
  if (req.session.user.userType !== "employee") {
    return res.status(401).json({ error: "Unauthorized: User" });
  }

  const profilesAdder = await UserEmployee.findById(
    req.session.user._id,
    "profilesPosted"
  );
  let profileIds = profilesAdder.profilesPosted;

  if (!profileIds.includes(req.params.profileId)) {
    return res.status(404).json({ error: "You don't own this Resume" });
  }

  try {
    const result = await Profile.findByIdAndDelete(profileId);
    if (!result) {
      return res.status(404).json({ error: "Profile not found" });
    }
    res.status(200).json({
      message: "Profile deleted successfully",
      profileId: result._id,
    });
  } catch (error) {
    console.error("Error deleting profile:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
