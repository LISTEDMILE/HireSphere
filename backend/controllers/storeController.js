const Job = require("../models/firstmodel");
const User = require("../models/userModel");
const { check, validationResult } = require("express-validator");

const Profile = require("../models/firstProfilemodel");

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

exports.getFavourites = (req, res, next) => {
  const favs = User.findById(req.session.user._id)
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
  try {
    const user = await User.findById(req.session.user._id, "offers");
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
        let offeredBy = await User.findById(detail.offeredBy);
        if (!profile || !offeredBy) {
          return null; // Skip this offer if profile or offeredBy is not found
        }
        return {
          profile: profile,
          offeredBy: offeredBy,
          status: detail.status,
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
  const profileId = req.params.profileId;
  if (
    !profileId ||
    !req.session ||
    !req.session.user ||
    !req.session.user._id
  ) {
    return res
      .status(400)
      .json({ error: "Profile ID is required or user not logged in" });
  }
  try {
    const user = await User.findById(req.session.user._id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    user.offers = user.offers.filter(
      (offer) => offer.profile._id.toString() !== profileId
    );
    await user.save();
    return res.status(200).json({ message: "Offer ignored successfully" });
  } catch (error) {
    console.error("Error ignoring offer:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.acceptOffer = async (req, res, next) => {
  const profileId = req.params.profileId;
  if (
    !profileId ||
    !req.session ||
    !req.session.user ||
    !req.session.user._id
  ) {
    return res
      .status(400)
      .json({ error: "Profile ID is required or user not logged in" });
  }
  try {
    const user = await User.findById(req.session.user._id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const offer = user.offers.find(
      (offer) => offer.profile._id.toString() === profileId
    );
    if (!offer) {
      return res.status(404).json({ error: "Offer not found" });
    }
    offer.status = "accepted";
    const userhost = await User.findById(offer.offeredBy);
    console.log("Userhost:", userhost);
    if (!userhost) {
      return res.status(404).json({ error: "Offer provider not found" });
    }
    if (!userhost.acceptedOffers.includes(profileId)) {
      userhost.acceptedOffers.push(profileId);
    }
    if (userhost.rejectedOffers.includes(profileId)) {
      userhost.rejectedOffers = userhost.rejectedOffers.filter(
        (offer) => offer._id.toString() !== profileId
      );
    }
    await userhost.save();
    await user.save();
    return res.status(200).json({ message: "Offer accepted successfully" });
  } catch (error) {
    console.error("Error accepting offer:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.rejectOffer = async (req, res, next) => {
  const profileId = req.params.profileId;
  if (
    !profileId ||
    !req.session ||
    !req.session.user ||
    !req.session.user._id
  ) {
    return res
      .status(400)
      .json({ error: "Profile ID is required or user not logged in" });
  }
  try {
    const user = await User.findById(req.session.user._id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const offer = user.offers.find(
      (offer) => offer.profile.toString() === profileId
    );
    if (!offer) {
      return res.status(404).json({ error: "Offer not found" });
    }
    offer.status = "rejected";
    const userhost = await User.findById(offer.offeredBy);
    if (!userhost) {
      return res.status(404).json({ error: "Offer provider not found" });
    }
    if (!userhost.rejectedOffers.includes(profileId)) {
      userhost.rejectedOffers.push(profileId);
    }
    if (userhost.acceptedOffers.includes(profileId)) {
      userhost.acceptedOffers = userhost.acceptedOffers.filter(
        (offer) => offer._id.toString() !== profileId
      );
    }
    await userhost.save();
    await user.save();
    return res.status(200).json({ message: "Offer rejected successfully" });
  } catch (error) {
    console.error("Error rejecting offer:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.getAppliedJobs = (req, res, next) => {
  const user = User.findById(req.session.user._id)
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
    const favs = await User.findById(req.session.user._id, "favourites");
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
    const user = await User.findById(req.session.user._id, "appliedJobs");
    let appliedIds = user.appliedJobs;
    const jobs = await Job.find({
      _id: { $in: appliedIds },
    });
    return res.status(200).json(jobs);
  } catch (error) {
    console.error("Error fetching applied jobs:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.postAddFavourites = async (req, res, next) => {
  const jobId = req.params.jobId;
  try {
    const user = await User.findById(req.session.user._id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    } else if (user.userType !== "employee") {
      return res
        .status(403)
        .json({ error: "Forbidden: Only employees can add favourites" });
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
  try {
    const user = await User.findById(req.session.user._id);
    const userhost = await User.findOne({ jobsPosted: jobId });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    } else if (user.userType !== "employee") {
      return res
        .status(403)
        .json({ error: "Forbidden: Only employees can apply for jobs" });
    }
    if (!userhost) {
      return res.status(404).json({ error: "Job not found" });
    } else if (userhost.userType !== "recruiter") {
      return res
        .status(403)
        .json({ error: "Forbidden: Only recruiters can post jobs" });
    }

    if (user.appliedJobs.includes(jobId)) {
      user.appliedJobs.pull(jobId);
      userhost.applications.pull({ job: jobId, applierProfile: user._id });
      await userhost.save();
      await user.save();
      return res.status(200).json({ message: "Job application cancelled" });
    } else {
      user.appliedJobs.push(jobId);
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

    const {
      _id,
      profileName,
      profileGender,
      profilePost,
      profileCourse,
      profileSkills,
      profileEmail,
      profileMobile,
      profileTenth,
      profileTwelth,
      profileGraduation,
      profileDescription,
      profilePostDescription,
    } = req.body;

    if (!errors.isEmpty()) {
      console.log("Validation errors:", errors.array());
      return res.status(400).json({
        message: "Validation failed",
        errors: errors.array().map((err) => err.msg),
        oldInput: {
          _id,
          profileName,
          profileGender,
          profilePost,
          profileCourse,
          profileSkills,
          profileEmail,
          profileMobile,
          profileTenth,
          profileTwelth,
          profileGraduation,
          profileDescription,
          profilePostDescription,
        },
      });
    }

    try {
      const user = await User.findById(req.session.user._id);
      if (!user) {
        return res.status(404).json({ errors: ["User not found"] });
      }

      if (user.userType !== "employee") {
        return res
          .status(403)
          .json({ errors: ["Forbidden: Only employees can add profiles"] });
      }

      let savedProfile;

      let existingProfile = await Profile.findById(_id);
      if (existingProfile) {
        existingProfile.profileName = profileName;
        existingProfile.profileGender = profileGender;
        existingProfile.profilePost = profilePost;
        existingProfile.profileCourse = profileCourse;
        existingProfile.profileSkills = profileSkills;
        existingProfile.profileEmail = profileEmail;
        existingProfile.profileMobile = profileMobile;
        existingProfile.profileTenth = profileTenth;
        existingProfile.profileTwelth = profileTwelth;
        existingProfile.profileGraduation = profileGraduation;
        existingProfile.profileDescription = profileDescription;
        existingProfile.profilePostDescription = profilePostDescription;

        savedProfile = await existingProfile.save();
      } else {
        const newProfile = new Profile({
          profileName,
          profileGender,
          profilePost,
          profileCourse,
          profileSkills,
          profileEmail,
          profileMobile,
          profileTenth,
          profileTwelth,
          profileGraduation,
          profileDescription,
          profilePostDescription,
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

exports.getEditProfile = (req, res, next) => {
  const profileId = req.params.profileId;
  if (!profileId) {
    return res.status(400).json({ error: "Profile ID is required" });
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

exports.postEditProfile = (req, res, next) => {
  const profile = new Profile(
    req.body._id,
    req.body.profileName,
    req.body.profileGender,
    req.body.profilePost,
    req.body.profileCourse,
    req.body.profileSkills,
    req.body.profileEmail,
    req.body.profileMobile,
    req.body.profileTenth,
    req.body.profileTwelth,
    req.body.profileGraduation,
    req.body.profileDescription,
    req.body.profilePostDescription
  );
  profile
    .save()
    .then(() => {
      res.redirect("/store/storeProfileList");
    })
    .catch((error) => {
      console.log("Error updating Profile", error);
    });
};

exports.storeProfileList = async (req, res, next) => {
  try {
    if (!req.session || !req.session.user || !req.session.user._id) {
      return res
        .status(401)
        .json({ error: "Unauthorized: Please log in first" });
    }
    const profilesAdder = await User.findById(
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

exports.postDeleteProfile = async (req, res, next) => {
  const profileId = req.params.profileId;
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
