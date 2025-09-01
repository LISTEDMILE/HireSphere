const express = require("express");
const hostController = require("../controllers/hostController");
const hostRouter = express.Router();
const upload = require("../utils/uploadUtils");

hostRouter.post("/addJob", hostController.addJobPost);
hostRouter.get("/hostJobList", hostController.hostJobList);

hostRouter.get("/editJob/:jobId", hostController.getEditJob);

hostRouter.get("/hostApplications", hostController.getApplications);

hostRouter.post("/deleteJob/:jobId", hostController.postDeleteJob);

hostRouter.delete(
  "/ignoreApplication/:applicationId",
  hostController.ignoreApplication
);
hostRouter.post(
  "/acceptApplication/:applicationId",
  hostController.acceptApplication
);
hostRouter.post(
  "/rejectApplication/:applicationId",
  hostController.rejectApplication
);

hostRouter.get("/hostProfileList", hostController.profileList);

hostRouter.get("/favouriteProfile", hostController.getProfileFavourites);
hostRouter.get("/onlyFavourites", hostController.getOnlyProfileFavourites);
hostRouter.post(
  "/favouriteProfile/:profileId",
  hostController.postAddProfileFavourites
);

hostRouter.get("/onlyChoosenProfiles", hostController.getOnlyChoosenProfiles);
hostRouter.get("/getChoosenProfiles", hostController.getChoosenProfiles);
hostRouter.post("/hireProfile/:profileId", hostController.postHireProfile);

hostRouter.get(
  "/hostApplicantProfiles/:applicantId",
  hostController.getApplicantProfiles
);
hostRouter.get("/hostJobDetails/:jobId", hostController.getHostJobDetails);
hostRouter.get(
  "/hostProfileDetails/:profileId",
  hostController.getHostProfileDetails
);

hostRouter.get(
  "/addAboutRecruiter/:userId",
  hostController.getAddAboutRecruiter
);

hostRouter.post(
  "/addAboutRecruiter",
  upload.single("profilePicture"),
  hostController.postAddAboutRecruiter
);

hostRouter.get("/aboutEmployee/:userId", hostController.getAboutEmployee);

module.exports = hostRouter;
