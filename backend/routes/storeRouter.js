const express = require('express');
const storeController = require('../controllers/storeController');
const storeRouter = express.Router();

storeRouter.get("/storeJobList",storeController.jobList);
storeRouter.get("/storeJobDetails/:jobId",storeController.storeJobDetails);
storeRouter.get("/favourite",storeController.getFavourites);
storeRouter.get("/onlyFavourites",storeController.getOnlyFavourites);
storeRouter.post("/favourite/:jobId",storeController.postAddFavourites);

storeRouter.get("/apply",storeController.getApply);

storeRouter.post("/apply",storeController.postApply);

storeRouter.post("/deleteProfile/:profileId",storeController.postDeleteProfile);






//  profile


storeRouter.post("/chooseProfile",storeController.postChooseProfile);

storeRouter.get("/addProfile",storeController.addProfileGet);
storeRouter.post("/addProfile",storeController.addProfilePost);
storeRouter.get("/storeProfileList",storeController.storeProfileList);
storeRouter.get("/storeProfileDetails/:profileId",storeController.storeProfileDetails);

storeRouter.get("/editProfile/:profileId",storeController.getEditProfile);
storeRouter.post("/editProfile",storeController.postEditProfile);

storeRouter.get("/chooseProfile",storeController.getChooseProfiles);

storeRouter.post("/deleteProfile/:profileId",storeController.postDeleteProfile);



module.exports = storeRouter;