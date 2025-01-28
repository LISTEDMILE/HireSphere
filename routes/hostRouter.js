const express = require('express');
const hostController = require('../controllers/hostController');
const hostRouter = express.Router();

hostRouter.get("/addJob",hostController.addJobGet);
hostRouter.post("/addJob",hostController.addJobPost);
hostRouter.get("/hostJobList",hostController.hostJobList);
hostRouter.get("/hostJobDetails/:jobId",hostController.hostJobDetails);

hostRouter.get("/editJob/:jobId",hostController.getEditJob);
hostRouter.post("/editJob",hostController.postEditJob);

hostRouter.get("/hostApplications",hostController.getApply);

hostRouter.post("/deleteJob/:jobId",hostController.postDeleteJob);


//profile


hostRouter.get("/profileList",hostController.profileList);
hostRouter.get("/hostProfileDetails/:profileId",hostController.hostProfileDetails);
hostRouter.get("/favouriteProfile",hostController.getProfileFavourites);

hostRouter.post("/favouriteProfile",hostController.postAddProfileFavourites);

hostRouter.get("/chooseProfile",hostController.getChooseProfiles);

hostRouter.post("/chooseProfile",hostController.postChooseProfile);

module.exports = hostRouter;