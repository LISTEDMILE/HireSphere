const { check, validationResult } = require("express-validator");
const UserEmployee = require("../models/userEmployee");
const UserRecruiter = require("../models/userRecruiter");
const bcrypt = require("bcryptjs");
const path = require("path");
const fs = require("fs");

exports.postSignUp = [
  check("firstname")
    .isLength({ min: 1 })
    .withMessage("First Name must be at least 1 characters long")
    .trim()
    .matches(/^[A-Za-z]+$/)
    .withMessage("First Name must contain only letters"),

  check("lastname")
    .isLength({ min: 1 })
    .withMessage("Last Name must be at least 1 characters long")
    .trim()
    .matches(/^[A-Za-z]+$/)
    .withMessage("Last Name must contain only letters"),

  check("username")
    .isEmail()
    .withMessage("Please enter a valid email address")
    .normalizeEmail()
    .custom(async (value) => {
      const existingRecruiter = await UserRecruiter.findOne({
        username: value,
      });
      if (existingRecruiter) {
        throw new Error("Email/Username is already in use");
      }
      const existingEmployee = await UserEmployee.findOne({
        username: value,
      });
      if (existingEmployee) {
        throw new Error("Email/Username is already in use");
      }
      return true;
    }),

  check("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one Uppercase letter")
    .matches(/[a-z]/)
    .withMessage("Password must contain at least one Lowercase letter")
    .matches(/\d/)
    .withMessage("Password must contain at least one number")
    .matches(/[@$!%*?&]/)
    .withMessage("Password must contain at least one special character")
    .trim(),

  // for custom validation to check if confirmPassword matches password
  check("confirmPassword").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Passwords do not match");
    }
    return true;
  }),

  check("userType")
    .notEmpty()
    .withMessage("User Type is required")
    .isIn(["employee", "recruiter"])
    .withMessage("User Type must be either 'Employee' or 'Recruiter''"),

  (req, res, next) => {
    const { firstname, lastname, username, password, userType } = req.body;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array().map((err) => err.msg),
        oldInput: {
          firstname,
          lastname,
          username,
          password,
          userType,
        },
      });
    }

    if (req.body.userType == "recruiter") {
      bcrypt.hash(password, 12).then((hashedPassword) => {
        const user = new UserRecruiter({
          firstname: firstname,
          lastname: lastname,
          username: username,
          password: hashedPassword,
          userType: userType,
        });

        user
          .save()
          .then(() => {
            res.status(201).json({
              message: "User signed up successfully",
            });
          })
          .catch((err) => {
            console.error("Error saving user:", err);
            res.status(500).json({
              isLoggedIn: false,
              errors: ["An error occurred while signing up. Please try again."],
              oldInput: {
                firstname,
                lastname,
                username,
                password,
                userType,
              },
            });
          });
      });
    } else if (req.body.userType == "employee") {
      bcrypt.hash(password, 12).then((hashedPassword) => {
        const user = new UserEmployee({
          firstname: firstname,
          lastname: lastname,
          username: username,
          password: hashedPassword,
          userType: userType,
        });

        user
          .save()
          .then(() => {
            res.status(201).json({
              message: "User signed up successfully",
            });
          })
          .catch((err) => {
            console.error("Error saving user:", err);
            res.status(500).json({
              isLoggedIn: false,
              errors: ["An error occurred while signing up. Please try again."],
              oldInput: {
                firstname,
                lastname,
                username,
                password,
                userType,
              },
            });
          });
      });
    }
  },
];

exports.getLogin = [
  check("userType")
    .notEmpty()
    .withMessage("User Type is required")
    .isIn(["employee", "recruiter"])
    .withMessage("User Type must be either 'Employee' or 'Recruiter''"),
  check("username")
    .normalizeEmail()
    .custom(async (value, userType) => {
      if (userType == "recruiter") {
        const existingRecruiter = await UserRecruiter.findOne({
          username: value,
        });
        if (!existingRecruiter) {
          throw new Error("Email/Username not found");
        }
      } else if (userType == "employee") {
        const existingEmployee = await UserEmployee.findOne({
          username: value,
        });
        if (!existingEmployee) {
          throw new Error("Email/Username not found");
        }
      }

      return true;
    }),

  check("password").notEmpty().withMessage("Password is required"),

  async (req, res, next) => {
    const { username, password, userType } = req.body;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array().map((err) => err.msg),
        oldInput: {
          userType,
          username,
          password,
        },
      });
    }
    let user;

    if (userType == "recruiter") {
      try {
        user = await UserRecruiter.findOne({ username: username });

        if (!user) {
          return res.status(401).json({
            isLoggedIn: false,
            errors: ["Invalid credentials"],
            oldInput: {
              userType,
              username,
              password,
            },
          });
        }
      } catch (err) {
        console.error("Error finding user:", err);
        res.status(500).json({
          isLoggedIn: false,
          errors: ["An error occurred while logging in. Please try again."],
          oldInput: {
            userType,
            username,
            password,
          },
        });
      }
    } else {
      try {
        user = await UserEmployee.findOne({ username: username });

        if (!user) {
          return res.status(401).json({
            isLoggedIn: false,
            errors: ["Invalid credentials"],
            oldInput: {
              userType,
              username,
              password,
            },
          });
        }
      } catch (err) {
        console.error("Error finding user:", err);
        res.status(500).json({
          isLoggedIn: false,
          errors: ["An error occurred while logging in. Please try again."],
          oldInput: {
            userType,
            username,
            password,
          },
        });
      }
    }
    bcrypt
      .compare(password, user.password)
      .then((isMatch) => {
        if (!isMatch) {
          return res.status(401).json({
            isLoggedIn: false,
            errors: ["Invalid credentials"],
            oldInput: {
              userType,
              username,
              password,
            },
          });
        }
        req.session.isLoggedIn = true;
        req.session.user = user;
        req.session.save((err) => {
          if (err) {
            console.error("Session save error:", err);
            return res.status(500).json({
              isLoggedIn: false,
              errors: ["An error occurred while saving the session."],
            });
          }

          res.status(200).json({
            isLoggedIn: true,
            message: "Login successful",
            userType: user.userType,
            username: user.username,
            firstname: user.firstname,
            lastname: user.lastname,
          });
        });
      })
      .catch((err) => {
        console.error("Error comparing passwords:", err);
        res.status(500).json({
          isLoggedIn: false,
          errors: ["An error occurred while logging in. Please try again."],
          oldInput: {
            userType,
            username,
            password,
          },
        });
      });
  },
];

exports.postMe = (req, res, next) => {
  if (req.session.isLoggedIn) {
    res.json({
      isLoggedIn: true,
      user: req.session.user,
    });
  }
};

exports.postLogOut = (req, res, next) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Session destroy error:", err);
      return res.status(500).json({
        success: false,
        errors: ["An error occurred while logging out."],
      });
    }

    res.clearCookie("connect.sid");

    return res.status(200).json({
      success: true,
      message: "Logged out successfully.",
    });
  });
};

exports.postDeleteAccount = async (req, res, next) => {
  try {
    if (!req.session?.user?._id) {
      return res
        .status(401)
        .json({ error: "Unauthorized: Please log in first" });
    }

    const { password } = req.body;
    let user;

    if (req.session.user.userType === "recruiter") {
      user = await UserRecruiter.findOne({
        username: req.session.user.username,
      });
    } else {
      user = await UserEmployee.findOne({
        username: req.session.user.username,
      });
    }

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ password: "Wrong Credentials" });
    }

    if (req.session.user.userType === "recruiter") {
      if (
        user.aboutRecruiter.profilePicture &&
        user.aboutRecruiter.profilePicture !== null
      ) {
        const oldImagePath = path.join(
          __dirname,
          `..${user.aboutRecruiter.profilePicture}`
        );
        fs.unlink(oldImagePath, (error) => {
          if (error) {
            console.log("Error uploading image", error);
          }
        });
      }
      await UserRecruiter.findByIdAndDelete(req.session.user._id);
    } else {
      if (
        user.aboutEmployee.profilePicture &&
        user.aboutEmployee.profilePicture !== null
      ) {
        const oldImagePath = path.join(
          __dirname,
          `..${user.aboutEmployee.profilePicture}`
        );
        fs.unlink(oldImagePath, (error) => {
          if (error) {
            console.log("Error uploading image", error);
          }
        });
      }
      await UserEmployee.findByIdAndDelete(req.session.user._id);
    }

    req.session.destroy((err) => {
      if (err) {
        console.error("Error destroying session:", err);
      }
      res.clearCookie("connect.sid");
      res.status(200).json({
        success: true,
        message: "Account Deleted Successfully.",
      });
    });
  } catch (error) {
    console.error("Error deleting account", error);
    res.status(500).json({ error: "Failed to delete account" });
  }
};
