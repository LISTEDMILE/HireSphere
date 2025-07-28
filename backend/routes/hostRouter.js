const express = require('express');
const hostController = require('../controllers/hostController');
const hostRouter = express.Router();

hostRouter.post("/addJob",hostController.addJobPost);
hostRouter.get("/hostJobList",hostController.hostJobList);
hostRouter.get("/hostJobDetails/:jobId",hostController.hostJobDetails);

hostRouter.get("/editJob/:jobId",hostController.getEditJob);

hostRouter.get("/hostApplications",hostController.getApplications);

hostRouter.post("/deleteJob/:jobId",hostController.postDeleteJob);


hostRouter.post("/apply",hostController.postApply);


//profile


hostRouter.get("/hostProfileList",hostController.profileList);
hostRouter.get("/hostProfileDetails/:profileId",hostController.hostProfileDetails);
hostRouter.get("/favouriteProfile",hostController.getProfileFavourites);
hostRouter.get("/onlyFavourites",hostController.getOnlyProfileFavourites);
hostRouter.post("/favouriteProfile/:profileId",hostController.postAddProfileFavourites);

hostRouter.get("/chooseProfile",hostController.getChooseProfiles);

hostRouter.post("/chooseProfile",hostController.postChooseProfile);


module.exports = hostRouter;