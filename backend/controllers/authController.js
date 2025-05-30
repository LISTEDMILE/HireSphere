const { check , validationResult } = require("express-validator");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");

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
        const existingUser = await User.findOne({ username: value });
        if (existingUser) {
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
    check("confirmPassword")
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error("Passwords do not match");
        }
        return true;
      }),
    
    check('userType')
      .notEmpty()
      .withMessage("User Type is required")
      .isIn(['employee', 'recruiter'])
        .withMessage("User Type must be either 'Employee' or 'Recruiter''"),
    
    
    (req, res, next) => {
      const { firstname, lastname, username, password, userType } = req.body;
  
        const errors = validationResult(req);
       
      if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array().map(err => err.msg),
            oldInput: {
              firstname,
              lastname,
              username,
              password,
              userType
            },
        });
      }
   bcrypt.hash(password, 12)
      .then(hashedPassword => {
        const user = new User({
          firstname: firstname,
          lastname: lastname,
          username: username,
          password: hashedPassword,
          userType: userType
        });
         
          user.save().then(()=>{
            res.status(201).json({
              message: "User signed up successfully",
            });
          })
        .catch(err => {
          console.error("Error saving user:", err);
          res.status(500).json({
             isLoggedIn: false,
            errors: ["An error occurred while signing up. Please try again."],
            oldInput: {
              firstname,
              lastname,
              username,
              password,
              userType
            },
          });
        });
      })
  
    
        
  }
  ]