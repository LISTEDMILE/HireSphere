const express = require('express');

exports.getLandingPage = (req,res,next) => {
    res.render('home/landingPage',{active:"landingPage",title:"Home"});
}

exports.getHelpPage = (req,res,next) => {
    res.render('home/helpPage',{active:"helpPage",title:"Help"});
}

exports.getContactPage = (req,res,next) => {
    res.render('home/contactPage',{active:"contactPage",title:"Contact-Us"});
}

exports.getAboutPage = (req,res,next) => {
    res.render('home/aboutPage',{active:"aboutPage",title:"About Us"});
}

exports.getLoginPage = (req,res,next) => {
    res.render('home/loginPage',{active:"loginPage",title:"Login",type:req.params.type});
}

exports.getSignUpPage = (req,res,next) => {
    res.render('home/signUpPage',{active:"signUpPage",title:"Sign Up",type:req.params.type});
}