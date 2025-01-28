const express = require('express');
const homeController = require('../controllers/homeController');
const homeRouter = express.Router();

homeRouter.get("/",homeController.getLandingPage);
homeRouter.get("/help",homeController.getHelpPage);
homeRouter.get("/contact",homeController.getContactPage);
homeRouter.get("/about",homeController.getAboutPage);
homeRouter.get("/login/:type",homeController.getLoginPage);
homeRouter.get("/signUp/:type",homeController.getSignUpPage);

module.exports = homeRouter;