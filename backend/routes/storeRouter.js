const express = require("express");
const storeController = require("../controllers/storeController");
const storeRouter = express.Router();

storeRouter.get("/storeJobList", storeController.jobList);

storeRouter.get("/favourite", storeController.getFavourites);
storeRouter.get("/onlyFavourites", storeController.getOnlyFavourites);
storeRouter.post("/favourite/:jobId", storeController.postAddFavourites);

storeRouter.get("/onlyAppliedJobs", storeController.getOnlyAppliedJobs);
storeRouter.get("/appliedJobs", storeController.getAppliedJobs);
storeRouter.post("/apply/:jobId", storeController.postApply);

storeRouter.get("/offers", storeController.getOffers);

storeRouter.post("/addProfile", storeController.addProfilePost);
storeRouter.get("/storeProfileList", storeController.storeProfileList);

storeRouter.get("/editProfile/:profileId", storeController.getEditProfile);

storeRouter.post(
  "/deleteProfile/:profileId",
  storeController.postDeleteProfile
);

storeRouter.delete("/ignoreOffer/:profileId", storeController.ignoreOffer);
storeRouter.post("/acceptOffer/:profileId", storeController.acceptOffer);
storeRouter.post("/rejectOffer/:profileId", storeController.rejectOffer);
storeRouter.get(
  "/storeOffererJobs/:offererId",
  storeController.getStoreOffererJobs
);

storeRouter.get("/storeJobDetails/:jobId", storeController.getStoreJobDetails);
storeRouter.get(
  "/storeProfileDetails/:profileId",
  storeController.getStoreProfileDetails
);

storeRouter.get(
  "/addAboutEmployee/:userId",
  storeController.getAddAboutEmployee
);
storeRouter.post("/addAboutEmployee", storeController.postAddAboutEmployee);
storeRouter.get("/aboutRecruiter/:userId", storeController.getAboutRecruiter);

module.exports = storeRouter;
