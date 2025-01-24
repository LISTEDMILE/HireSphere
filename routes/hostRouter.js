const express = require('express');
const hostController = require('../controllers/hostController');
const hostRouter = express.Router();

hostRouter.get("/addJob",hostController.addJobGet);
hostRouter.post("/addJob",hostController.addJobPost);
hostRouter.get("/hostJobList",hostController.hostJobList);
hostRouter.get("/hostJobDetails/:jobId",hostController.hostJobDetails);

hostRouter.get("/editJob/:jobId",hostController.getEditJob);
hostRouter.post("/editJob",hostController.postEditJob);

hostRouter.post("/deleteJob/:jobId",hostController.postDeleteJob);

module.exports = hostRouter;