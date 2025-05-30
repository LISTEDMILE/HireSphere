const express = require('express');
const authController = require('../controllers/authController');
const authRouter = express.Router();


// homeRouter.get("/login/:type",homeController.getLoginPage);
authRouter.post("/api/signUp",authController.postSignUp);

module.exports = authRouter;