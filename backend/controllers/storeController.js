
const Job = require('../models/firstmodel');
const favouriteClass= require('../models/favouriteModel');
const applyClass = require('../models/applyModel');
const User = require('../models/userModel');
const { check, validationResult } = require('express-validator');


const Profile = require('../models/firstProfilemodel');
const favouriteProfileClass= require('../models/favouriteProfileModel');
const chooseProfileClass = require('../models/chooseProfileModel');

exports.jobList = (req, res, next) => {
    
    const details = Job.find().then((details) => {
        res.status(200).json({
            message: "Job List fetched successfully",
            details: details
        })
    })
        .catch(err => {
            console.log("Error fetching job list", err);
            res.status(500).json({
                message: "Error fetching job list",
                error: err
            });
        }
    );
};


exports.storeJobDetails = (req,res,next) => {
    const jobId = req.params.jobId;
    Job.findById(jobId).then (detail => {

        favouriteClass.getFavourites().then((favourites) => {
            applyClass.getApply().then((applies) => {
                const detailsWithoutFavObj = favourites.map(fav => fav.jobId);
                const detailsWithoutApplyObj = applies.map(appl => appl.jobId);
                detail.apply = detailsWithoutApplyObj.includes((detail._id).toString());
                detail.fav = detailsWithoutFavObj.includes((detail._id).toString());
                res.render('store/storeJobDetails',{detail:detail,active:"storeJobList",title:"Required Job"});
            })
        })
        
    })
};


exports.getFavourites = (req,res,next) => {
    const favs = User.findById(req.session.user._id).then(user => {
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        return res.status(200).json({
            message: "Favourites fetched successfully",
            favIds: user.favourites,
        }); 
    }).catch(err => {
        console.error("Error fetching favourites:", err);
        return res.status(500).json({ error: "Internal server error" });
    });
};

exports.getOnlyFavourites = async (req,res,next) => {
    try{
        if(!req.session || !req.session.user || !req.session.user._id){
            return res.status(401).json({ error: "Unauthorized: Please log in first" });  
        }
        const favs = await User.findById(req.session.user._id, 'favourites');
        let favIds = favs.favourites;

        const jobs = await Job.find({
            _id:{$in:favIds}
        })
        return res.status(200).json(jobs);
    }
    catch(error){
        console.error("Error fetching favourites:", error);
    }

}

exports.getApply = (req,res,next) => {
    applyClass.getApply().then(applies => {
        favouriteClass.getFavourites().then(favourites => {
        applies = applies.map(appl => appl.jobId)
            favourites = favourites.map(fav => fav.jobId);
        const details = Job.fetchAll().then(details => {
            const appliedJobs = details.filter((e) => applies.includes(String(e._id)));
            const detailsWithFavAndApply = appliedJobs.map(detail => {
                if(favourites.includes(detail._id.toString())){
                    detail.fav=true;
                }
                else{
                    detail.fav=false;
                }
                return detail;
            })
            res.render('store/applied',{appliedJobs:detailsWithFavAndApply,title:"Applied",active:"applied"});
        })
        })
    })
        

};

exports.postAddFavourites = async (req,res,next)  => {
    const jobId = req.params.jobId;
    try{
        const user = await User.findById(req.session.user._id);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        else if (user.userType !== 'employee') { 
            return res.status(403).json({ error: "Forbidden: Only employees can add favourites" });
        }

        if(user.favourites.includes(jobId)){
            user.favourites.pull(jobId);
            await user.save();
            return res.status(200).json({message: "Job removed from favourites"});
        }
        else{
            user.favourites.push(jobId);
            await user.save();
            return res.status(200).json({message: "Job added to favourites"});
        }
    }
    catch(err){
        console.error("Error updating favourites:", err);
        return res.status(500).json({ error: "Internal server error" });
    }
}


exports.postApply = (req,res,next) => {
    const jobId = String(req.body._id);
    applyClass.getApply().then(applies => {
        applies = applies.map(appl => appl.jobId);
        if(applies.includes(jobId)){
            applyClass.deleteApply(jobId);
        }
        else{
            const appl = new applyClass(jobId);
            appl.save()
            .catch(err => {
                console.log("Error adding fav",err);
            })
        }
    })
    .then(() => {
        res.redirect('/store/apply');
    })
   
    
};



exports.postDeleteProfile = (req,res,next) => {
    const profileId = req.params.profileId;
    Profile.deleteById(profileId)
    .then((profileId) => {
        favouriteProfileClass.getFavourites().then(favourites => {
            chooseProfileClass.getApply().then((choosens)=>{
            favourites = favourites.map(fav => fav.profileId);
            choosens = choosens.map(choose => choose.jobId);
            if(favourites.includes(profileId)){
                favouriteClass.deleteFavourite(profileId);
            }
            if(choosens.includes(profileId)){
                chooseProfileClass.deleteChoosen(profileId);
            }
        
        })
    })
    })
    .then(() => {res.redirect('/host/hostJobList');})
    .catch(error=>{
        console.log('Error deleting Job',error);
    })
}



exports.getJobDetails = (req,res,next) => {
    const jobId = req.params.Hid;
    Job.findById(jobId).then((job) => {
        if (!job){
            console.log("Job not found");
            res.redirect('/store/jobList');
        }
        else{
            res.render('store/jobDetails',{title:"Details",active:"jobList",job:job});
        }
    })
    
};






//profile








exports.addProfilePost = [
    
    check("profileName").notEmpty().withMessage("Profile Name is required").trim(),
    check("profileGender").notEmpty().withMessage("Profile Gender is required").trim(),
    check("profilePost").notEmpty().withMessage("Profile Post is required").trim(),
    check("profileCourse").notEmpty().withMessage("Profile Course is required").trim(),
    check("profileSkills").notEmpty().withMessage("Profile Skills is required").trim(),
    check("profileEmail").isEmail().withMessage("Profile Email is required").normalizeEmail(),
    check("profileMobile").notEmpty().withMessage("Profile Mobile is required").trim(), check("profileTenth").notEmpty().withMessage("Profile Tenth is required").trim(),
    check("profileTwelth").notEmpty().withMessage("Profile Twelth is required").trim(),
    check("profileGraduation").notEmpty().withMessage("Profile Graduation is required").trim(),
    check("profileDescription").notEmpty().withMessage("Profile Description is required").trim(), check("profilePostDescription").notEmpty().withMessage("Profile Post Description is required").trim(),
        
   async (req, res, next) => {
        const errors = validationResult(req);

        const {_id, profileName, profileGender, profilePost, profileCourse, profileSkills, profileEmail, profileMobile, profileTenth, profileTwelth, profileGraduation, profileDescription, profilePostDescription } = req.body;

        if (!errors.isEmpty()) {
            console.log("Validation errors:", errors.array());
            return res.status(400).json({
                message: "Validation failed",
                errors: errors.array().map(err => err.msg),
                oldInput: {
                    _id,
                    profileName,
                    profileGender,
                    profilePost,
                    profileCourse,
                    profileSkills,
                    profileEmail,
                    profileMobile,
                    profileTenth,
                    profileTwelth,
                    profileGraduation,
                    profileDescription, profilePostDescription
                }

            })
        }

        try {
            const user = await User.findById(req.session.user._id);
            if (!user) {
                return res.status(404).json({ errors: ["User not found"] });
            }

            if (user.userType !== 'employee') {
                return res.status(403).json({ errors: ["Forbidden: Only employees can add profiles"] });
            }

            let savedProfile;

            let existingProfile = await Profile.findById(_id);
            if (existingProfile) {
                existingProfile.profileName = profileName;
                existingProfile.profileGender = profileGender;
                existingProfile.profilePost = profilePost;
                existingProfile.profileCourse = profileCourse;
                existingProfile.profileSkills = profileSkills;
                existingProfile.profileEmail = profileEmail;
                existingProfile.profileMobile = profileMobile;
                existingProfile.profileTenth = profileTenth;
                existingProfile.profileTwelth = profileTwelth;
                existingProfile.profileGraduation = profileGraduation;
                existingProfile.profileDescription = profileDescription;
                existingProfile.profilePostDescription = profilePostDescription;

                savedProfile = await existingProfile.save();
            }

            else {
                
                const newProfile = new Profile({ profileName, profileGender, profilePost, profileCourse, profileSkills, profileEmail, profileMobile, profileTenth, profileTwelth, profileGraduation, profileDescription, profilePostDescription });
                savedProfile = await newProfile.save();
            }


            user.profilesPosted.push(savedProfile._id);
            await user.save();

            return res.status(201).json({
                message: "Profile added successfully",
            });

        }
        catch (error) {
            console.error("Error adding profile:", error);
            return res.status(500).json({ errors: ["Internal server error"] });
        }

    }
        
];
        
exports.getEditProfile = (req, res, next) => {
    const profileId = req.params.profileId;
    if (!profileId) {
        return res.status(400).json({ error: "Profile ID is required" });
    }
    else {
        Profile.findById(profileId).then((profile) => {
            if (!profile) {
                return res.status(404).json({ error: "Profile not found" });
            }
            else {
                res.status(200).json({
                    _id: profile._id,
                    profileName: profile.profileName,
                    profileGender: profile.profileGender,
                    profilePost: profile.profilePost,
                    profileCourse: profile.profileCourse,
                    profileSkills: profile.profileSkills,
                    profileEmail: profile.profileEmail,
                    profileMobile: profile.profileMobile,
                    profileTenth: profile.profileTenth,
                    profileTwelth: profile.profileTwelth,
                    profileGraduation: profile.profileGraduation,
                    profileDescription: profile.profileDescription,
                    profilePostDescription: profile.profilePostDescription

                });
            }
        }).catch((error) => {
            console.error("Error fetching profile:", error);
            return res.status(500).json({ error: "Internal server error" });
        });
    }
};
   



exports.getChooseProfiles = (req,res,next) => {
    chooseProfileClass.getChooseProfiles().then(profiles => {
        profiles = profiles.map(prof => prof.profileId);
        const details = Profile.fetchAll().then(details => {
            const choosenProfiles = details.filter((e) => profiles.includes(String(e._id)));
            res.render('store/choosenProfiles',{details:choosenProfiles,title:"Choosen",active:"choosenProfiles"});
        })
    })
        

};


exports.postEditProfile = (req, res, next) => {
    const profile = new Profile(
        req.body._id,
        req.body.profileName,
        req.body.profileGender,
        req.body.profilePost,
        req.body.profileCourse,
        req.body.profileSkills,
        req.body.profileEmail,
        req.body.profileMobile,
        req.body.profileTenth,
        req.body.profileTwelth,
        req.body.profileGraduation,
        req.body.profileDescription,
        req.body.profilePostDescription
    );
    profile.save()
    .then(() => {
        res.redirect('/store/storeProfileList');
    })
        .catch(error => {
            console.log('Error updating Profile', error);
        })
};


exports.storeProfileList = async (req, res, next) => {
    try {
        if (!req.session || !req.session.user || !req.session.user._id) {
            return res.status(401).json({ error: "Unauthorized: Please log in first" });
        }
        const profilesAdder = await User.findById(req.session.user._id, 'profilesPosted');
        let profileIds = profilesAdder.profilesPosted;

        const profiles = await Profile.find({
            _id: { $in: profileIds }
        });
        return res.status(200).json(profiles);

    }
    catch (error) {
        console.error("Error fetching profiles:", error);
    }
}

exports.storeProfileDetails = (req,res,next) => {
    const profileId = req.params.profileId;
    Profile.findById(profileId).then (profile => {
        res.render('store/storeProfileDetails',{detail:profile,active:"storeProfileList",title:"Required Profile"});
    })
};

    exports.postDeleteProfile = async (req, res, next) => {
        const profileId = req.params.profileId;
        try {
            const result = await Profile.findByIdAndDelete(profileId);
            if (!result) {
                return res.status(404).json({ error: "Profile not found" });
            }
            res.status(200).json({
                message: "Profile deleted successfully",
                profileId: result._id
            });
        } catch (error) {
            console.error("Error deleting profile:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    };





exports.postChooseProfile = (req,res,next) => {
    const profileId = String(req.body._id);
    chooseProfileClass.getChooseProfiles().then(profiles => {
        profiles = profiles.map(prof => prof.profileId);
        if(profiles.includes(profileId)){
            chooseProfileClass.deleteChoosen(profileId);
        }
        else{
            const prof = new chooseProfileClass(profileId);
            prof.save()
            .catch(err => {
                console.log("Error adding profile fav",err);
            })
        }
    })
    .then(() => {
        res.redirect('/store/chooseProfile');
    })
   
    
};
    
        
        
    



