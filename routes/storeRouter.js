const express = require('express');
const storeController = require('../controllers/storeController');
const storeRouter = express.Router();

storeRouter.get("/",storeController.getIndex);
storeRouter.get("/jobList",storeController.jobList);
storeRouter.get("/storeJobDetails/:jobId",storeController.storeJobDetails);
storeRouter.get("/booked",storeController.getBooked);
storeRouter.get("/favourite",storeController.getFavourites);

storeRouter.post("/favourite",storeController.postAddFavourites);

module.exports = storeRouter;