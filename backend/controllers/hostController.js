const Job = require("../models/firstmodel");
const User = require("../models/userModel");
const {check, validationResult } = require("express-validator");
const favouriteClass = require("../models/favouriteModel");
const applyClass = require("../models/applyModel");

const Profile = require("../models/firstProfilemodel");
const favouriteProfileClass = require("../models/favouriteProfileModel");
const chooseProfileClass = require("../models/chooseProfileModel");

exports.addJobGet = (req, res, next) => {
  res.render("host/addJob", {
    active: "addJob",
    title: "Add Job",
    editing: false,
  });
};

exports.addJobPost = [
    check("jobCompany").notEmpty().withMessage("Job Company is required").trim(),
    check("jobPost").notEmpty().withMessage("Job Post is required").trim(),
    check("jobLocation").notEmpty().withMessage("Job Location is required").trim(),
    check("jobOwnerMobile").notEmpty().withMessage("Job Owner Mobile is required").trim(),
    check("jobOwnerEmail").notEmpty().withMessage("Job Owner Email is required")
      .isEmail().withMessage("Invalid email format").normalizeEmail(),
    check("description").notEmpty().withMessage("Job Description is required").trim(),
  
    async (req, res) => {
      const errors = validationResult(req);
      const {
        _id,
        jobCompany,
        jobPost,
        jobLocation,
        jobOwnerMobile,
        jobOwnerEmail,
        description,
      } = req.body;
  
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array().map((err) => err.msg),
          oldInput: {
            _id,
            jobCompany,
            jobPost,
            jobLocation,
            jobOwnerMobile,
            jobOwnerEmail,
            description,
          },
        });
      }
  
      try {
        const user = await User.findById(req.session.user._id);
  
        if (!user) {
          return res.status(404).json({ errors: ["User not found"] });
        }
       
        if (user.userType !== "recruiter") {
          return res.status(403).json({ errors: ["Access denied. Only recruiters can post jobs."] });
        }
  
        

      let savedJob;
        

        let existingJob = await Job.findById(_id);
        if (existingJob) {
          existingJob.jobCompany = jobCompany;
          existingJob.jobPost = jobPost;
          existingJob.jobLocation = jobLocation;
          existingJob.jobOwnerMobile = jobOwnerMobile;
          existingJob.jobOwnerEmail = jobOwnerEmail;
          existingJob.description = description;
         savedJob=  await existingJob.save();
        }
        else{

          const job = new Job({
            jobCompany,
            jobPost,
            jobLocation,
            jobOwnerMobile,
            jobOwnerEmail,
            description,
          });

          savedJob = await job.save();
        }
  
         
  
        user.jobsPosted.push(savedJob._id);
        await user.save();

        return res.status(201).json({ message: "Post Added Successfully" });
      } catch (err) {
        console.error(err);
        return res.status(500).json({ errors: ["Something went wrong"] });
      }
    }
  ];


exports.getEditJob = (req, res, next) => {
 const jobId = req.params.jobId;
  if (!jobId) {
    return res.status(400).send({ error: "Job ID is required" });
  }
  else {
    Job.findById(jobId).then((job) => {
      if (!job) {
        console.log("Job not found");
       return res.status(404).send("Job not found");
      }
      else {
        res.status(200).json({
          _id: job._id,
          jobCompany: job.jobCompany,
          jobPost: job.jobPost,
          jobLocation: job.jobLocation,
          jobOwnerMobile: job.jobOwnerMobile,
          jobOwnerEmail: job.jobOwnerEmail,
          description: job.description,
        });
      }
    }).catch((err) => {
      console.error("Error fetching job details:", err);
      res.status(500).json({ error: "Failed to fetch job details" });
    });
  }
};

exports.getApply = (req, res, next) => {
  applyClass.getApply().then((applies) => {
    applies = applies.map((appl) => appl.jobId);
    const details = Job.fetchAll().then((details) => {
      const appliedJobs = details.filter((e) =>
        applies.includes(String(e._id))
      );
      res.render("host/hostApplications", {
        appliedJobs: appliedJobs,
        title: "Applied",
        active: "hostApplied",
      });
    });
  });
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
  job.save();
  res.redirect("/host/hostJobList");
};

exports.hostJobList = async (req, res, next) => {
  try {
    if (!req.session || !req.session.user || !req.session.user._id) {
      return res.status(401).json({ error: "Unauthorized: Please log in first" });
    }
  const jobProvider = await User.findById(req.session.user._id, 'jobsPosted');
  jobList = jobProvider.jobsPosted;
   
      const jobs = await Job.find({
        _id : { $in: jobList }
      });
      return res.status(200).json(jobs);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
};

exports.hostJobDetails = (req, res, next) => {
  const jobId = req.params.jobId;
  Job.findById(jobId).then((job) => {
    res.render("host/hostJobDetails", {
      detail: job,
      active: "hostJobList",
      title: "Required Job",
    });
  });
};

exports.postDeleteJob = async (req, res, next) => {
  const jobId = req.params.jobId;

  try {
    const result = await Job.findByIdAndDelete(jobId);

    if (!result) {
      return res.status(404).json({ message: "Job not found" });
    }
    res.status(200).json({ message: "Job deleted successfully", jobId: result._id });
  } catch (error) {
    console.error("Error deleting job:", error);
    res.status(500).json({ error: "Failed to delete job" });
  }
};

exports.postApply = (req, res, next) => {
  const jobId = String(req.body._id);
  applyClass
    .getApply()
    .then((applies) => {
      applies = applies.map((appl) => appl.jobId);
      if (applies.includes(jobId)) {
        applyClass.deleteApply(jobId);
      } else {
        const appl = new applyClass(jobId);
        appl.save().catch((err) => {
          console.log("Error adding fav", err);
        });
      }
    })
    .then(() => {
      res.redirect("/host/hostApplications");
    });
};

/// profile

exports.profileList = (req, res, next) => {
  const details = Profile.fetchAll().then((details) => {
    favouriteProfileClass.getFavourites().then((favourites) => {
      chooseProfileClass.getChooseProfiles().then((profiles) => {
        const detailsWithoutFavObj = favourites.map((fav) => fav.profileId);
        const detailsWithFav = details.map((detail) => {
          if (detailsWithoutFavObj.includes(detail._id.toString())) {
            detail.fav = true;
          } else {
            detail.fav = false;
          }
          return detail;
        });
        const detailsWithoutChoosenObj = profiles.map((prof) => prof.profileId);
        const detailsWithChoosenAndFav = detailsWithFav.map((detail) => {
          if (detailsWithoutChoosenObj.includes(detail._id.toString())) {
            detail.choosen = true;
          } else {
            detail.choosen = false;
          }
          return detail;
        });
        res.render("host/profileList", {
          details: detailsWithChoosenAndFav,
          title: "Profile List",
          active: "profileList",
        });
      });
    });
  });
};

exports.hostProfileDetails = (req, res, next) => {
  const profileId = req.params.profileId;
  Profile.findById(profileId).then((detail) => {
    favouriteProfileClass.getFavourites().then((favourites) => {
      chooseProfileClass.getChooseProfiles().then((choosens) => {
        const detailsWithoutFavObj = favourites.map((fav) => fav.profileId);
        const detailsWithoutChooseObj = choosens.map(
          (choosens) => choosens.profileId
        );
        detail.fav = detailsWithoutFavObj.includes(detail._id.toString());
        detail.choosen = detailsWithoutChooseObj.includes(
          detail._id.toString()
        );
        res.render("host/hostProfileDetails", {
          detail: detail,
          active: "profileList",
          title: "Required Profile",
        });
      });
    });
  });
};

exports.getProfileFavourites = (req, res, next) => {
  favouriteProfileClass.getFavourites().then((favourites) => {
    favourites = favourites.map((fav) => fav.profileId);
    const details = Profile.fetchAll().then((details) => {
      const favouriteProfiles = details.filter((e) =>
        favourites.includes(String(e._id))
      );
      res.render("host/favouriteProfiles", {
        favouriteProfiles: favouriteProfiles,
        title: "Favourites",
        active: "favouriteProfiles",
      });
    });
  });
};

exports.getChooseProfiles = (req, res, next) => {
  chooseProfileClass.getChooseProfiles().then((profiles) => {
    profiles = profiles.map((prof) => prof.profileId);
    const details = Profile.fetchAll().then((details) => {
      const choosenProfiles = details.filter((e) =>
        profiles.includes(String(e._id))
      );
      res.render("host/choosenProfiles", {
        details: choosenProfiles,
        title: "Choosen",
        active: "choosenProfiles",
      });
    });
  });
};

exports.postAddProfileFavourites = (req, res, next) => {
  const profileId = String(req.body._id);
  favouriteProfileClass
    .getFavourites()
    .then((favourites) => {
      favourites = favourites.map((fav) => fav.profileId);
      if (favourites.includes(profileId)) {
        favouriteProfileClass.deleteFavourite(profileId);
      } else {
        const fav = new favouriteProfileClass(profileId);
        fav.save().catch((err) => {
          console.log("Error adding profile fav", err);
        });
      }
    })
    .then(() => {
      res.redirect("/host/favouriteProfile");
    });
};

exports.postChooseProfile = (req, res, next) => {
  const profileId = String(req.body._id);
  chooseProfileClass
    .getChooseProfiles()
    .then((profiles) => {
      profiles = profiles.map((prof) => prof.profileId);
      if (profiles.includes(profileId)) {
        chooseProfileClass.deleteChoosen(profileId);
      } else {
        const prof = new chooseProfileClass(profileId);
        prof.save().catch((err) => {
          console.log("Error adding profile fav", err);
        });
      }
    })
    .then(() => {
      res.redirect("/host/chooseProfile");
    });
};

exports.getProfileDetails = (req, res, next) => {
  const profileId = req.params.Hid;
  Profile.findById(profileId).then((profile) => {
    if (!profile) {
      console.log("profile not found");
      res.redirect("/host/profileList");
    } else {
      res.render("host/profileDetails", {
        title: "Details",
        active: "profileList",
        profile: profile,
      });
    }
  });
};
