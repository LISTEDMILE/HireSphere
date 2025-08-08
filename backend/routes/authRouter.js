const express = require("express");
const authController = require("../controllers/authController");
const authRouter = express.Router();

authRouter.post("/api/login", authController.getLogin);
authRouter.post("/api/signUp", authController.postSignUp);
authRouter.post("/api/me", authController.postMe);
authRouter.post("/api/logout", authController.postLogOut);

module.exports = authRouter;
