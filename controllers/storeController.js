
const Job = require('../models/firstmodel');
const favouriteClass= require('../models/favouriteModel');
const applyClass = require('../models/applyModel');


const Profile = require('../models/firstProfilemodel');
const favouriteProfileClass= require('../models/favouriteProfileModel');
const chooseProfileClass = require('../models/chooseProfileModel');

exports.jobList = (req,res,next) => {
    const details = Job.fetchAll().then((details) => {
        favouriteClass.getFavourites().then((favourites) => { 
            applyClass.getApply().then((applies) =>{
                const detailsWithoutFavObj = favourites.map(fav => fav.jobId);
                const detailsWithFav = details.map(detail => {
                    if(detailsWithoutFavObj.includes((detail._id).toString())){
                        detail.fav=true;
                    }
                    else{
                        detail.fav=false;
                    }
                    return detail;
                  
                })
                const detailsWithoutApplyObj = applies.map(appl => appl.jobId);
                const detailsWithApplyAndFav = detailsWithFav.map(detail => {
                    if(detailsWithoutApplyObj.includes(detail._id.toString())){
                        detail.apply=true;
                    }
                    else{
                        detail.apply=false;
                    }
                    return detail;
                  
                })
                res.render('store/jobList',{details:detailsWithApplyAndFav,title:"Job List",active:"jobList"});
            })   
            
           
        })
        
    });
};


exports.storeJobDetails = (req,res,next) => {
    const jobId = req.params.jobId;
    Job.findById(jobId).then (job => {
        res.render('store/storeJobDetails',{detail:job,active:"storeJobList",title:"Required Job"});
    })
};


exports.getFavourites = (req,res,next) => {
    favouriteClass.getFavourites().then(favourites => {
        favourites = favourites.map(fav => fav.jobId);
        const details = Job.fetchAll().then(details => {
            applyClass.getApply().then((applies) =>{
                const favouriteJobs = details.filter((e) => favourites.includes(String(e._id)));
                const detailsWithoutApplyObj = applies.map(appl => appl.jobId);
                const detailsWithApplyAndFav = favouriteJobs.map(detail => {
                    if(detailsWithoutApplyObj.includes(detail._id.toString())){
                        detail.apply=true;
                    }
                    else{
                        detail.apply=false;
                    }
                    return detail;
                })
                res.render('store/favourite',{favouriteJobs:detailsWithApplyAndFav,title:"Favourites",active:"favourite"});
            })
         })
    })
     

};

exports.getApply = (req,res,next) => {
    applyClass.getApply().then(applies => {
        applies = applies.map(appl => appl.jobId);
        const details = Job.fetchAll().then(details => {
            const appliedJobs = details.filter((e) => applies.includes(String(e._id)));
            res.render('store/applied',{appliedJobs:appliedJobs,title:"Applied",active:"applied"});
        })
    })
        

};

exports.postAddFavourites = (req,res,next) => {
    const jobId = String(req.body._id);
    favouriteClass.getFavourites().then(favourites => {
        favourites = favourites.map(fav => fav.jobId);
        if(favourites.includes(jobId)){
            favouriteClass.deleteFavourite(jobId);
        }
        else{
            const fav = new favouriteClass(jobId);
            fav.save()
            .catch(err => {
                console.log("Error adding fav",err);
            })
        }
    })
    .then(() => {
        res.redirect('/store/favourite');
    })
   
    
};


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




exports.addProfileGet = (req,res,next) => {
    res.render('store/addProfile',{active:"addProfile",title:"Add Profile",editing:false});
};



exports.addProfilePost = (req,res,next) => {
    const profile = new Profile(req.body.jobCompany,req.body.jobPost,req.body.jobLocation,req.body.jobOwnerEmail,req.body.jobOwnerMobile,req.body.description);
    profile.save();
    res.render('store/addedProfile',{active:"addProfilePost",title:"Profile Added"});
};

exports.getEditProfile = (req,res,next) => {
    const profileId = req.params.profileId;
    const editing = req.query.editing === 'true';
    Profile.findById(profileId).then (profile => {
        if(!profile){
            console.log("Profile not found");
            res.redirect("store/storeProfileList");
        }
        
        res.render('store/addProfile',{detail:profile,active:"storeProfileList",title:"Edit Profile",editing:editing});
    })
    
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


exports.postEditProfile = (req,res,next) => {
    const profile = new Profile(req.body.jobCompany,req.body.jobPost,req.body.jobLocation,req.body.jobOwnerEmail,req.body.jobOwnerMobile,req.body.description,req.body._id);
    job.save();
    res.redirect('/store/storeProfileList');
};

exports.storeProfileList = (req,res,next) => {
    const details = Profile.fetchAll().then((details) => {
        res.render('store/storeProfileList',{active:"storeProfileList",title:"Profiles added by you",details:details});
    });
};

exports.storeProfileDetails = (req,res,next) => {
    const profileId = req.params.profileId;
    Profile.findById(profileId).then (profile => {
        res.render('store/storeProfileDetails',{detail:profile,active:"storeProfileList",title:"Required Profile"});
    })
};


exports.postDeleteProfile = (req,res,next) => {
    const profileId = req.params.profileId;
    Profile.deleteById(profileId)
    .then((profileId) => {
        favouriteProfileClass.getFavourites().then(favourites => {
            favourites = favourites.map(fav => fav.profileId);
            if(favourites.includes(profileId)){
                favouriteProfileClass.deleteFavourite(profileId);
            }
        })
    })
    .then(() => {res.redirect('/store/storeProfileList');})
    .catch(error=>{
        console.log('Error deleting Profile',error);
    })
}

    
        
        
    



