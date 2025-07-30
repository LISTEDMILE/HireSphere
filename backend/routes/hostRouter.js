const express = require("express");
const hostController = require("../controllers/hostController");
const hostRouter = express.Router();

hostRouter.post("/addJob", hostController.addJobPost);
hostRouter.get("/hostJobList", hostController.hostJobList);
hostRouter.get("/hostJobDetails/:jobId", hostController.hostJobDetails);

hostRouter.get("/editJob/:jobId", hostController.getEditJob);

hostRouter.get("/hostApplications", hostController.getApplications);

hostRouter.post("/deleteJob/:jobId", hostController.postDeleteJob);

hostRouter.delete("/ignoreApplication/:jobId", hostController.ignoreApplication);
hostRouter.post("/acceptApplication/:jobId", hostController.acceptApplication);
hostRouter.post("/rejectApplication/:jobId", hostController.rejectApplication);

hostRouter.get("/hostProfileList", hostController.profileList);

hostRouter.get("/favouriteProfile", hostController.getProfileFavourites);
hostRouter.get("/onlyFavourites", hostController.getOnlyProfileFavourites);
hostRouter.post("/favouriteProfile/:profileId", hostController.postAddProfileFavourites);

hostRouter.get("/onlyChoosenProfiles", hostController.getOnlyChoosenProfiles);
hostRouter.get("/getChoosenProfiles", hostController.getChoosenProfiles);
hostRouter.post("/hireProfile/:profileId", hostController.postHireProfile);

module.exports = hostRouter;
