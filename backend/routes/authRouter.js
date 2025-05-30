const express = require("express");
const authController = require("../controllers/authController");
const authRouter = express.Router();

authRouter.post("/api/login", authController.getLogin);
authRouter.post("/api/signUp", authController.postSignUp);

module.exports = authRouter;
