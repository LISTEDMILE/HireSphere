
const Job = require('../models/firstmodel');
const favouriteClass= require('../models/favouriteModel');

exports.jobList = (req,res,next) => {
    const details = Job.fetchAll().then((details) => {
        favouriteClass.getFavourites().then((favourites) => {    
            const detailsWithFav = details.map(detail => {
                if(favourites.includes(detail._id)){
                    detail.fav=true;
                }
                else{
                    detail.fav=false;
                }
                return detail;
              
            })
            res.render('store/jobList',{details:detailsWithFav,title:"Job List",active:"JobList"});
        })
        
    });
};

exports.storeJobDetails = (req,res,next) => {
    const jobId = req.params.jobId;
    Job.findById(jobId).then (job => {
        res.render('store/storeJobDetails',{detail:job,active:"storeJobList",title:"Required Job"});
    })
};

exports.getBooked = (req,res,next) => {
    const details = Job.fetchAll((details) => {
        res.render('store/booked',{details:details,title:"Bookings",active:"booked"});
    });
};

exports.getFavourites = (req,res,next) => {
    favouriteClass.getFavourites().then(favourites => {
        favourites = favourites.map(fav => fav.jobId);
        const details = Job.fetchAll().then(details => {
            const favouriteJobs = details.filter((e) => favourites.includes(String(e._id)));
            res.render('store/favourite',{favouriteJobs:favouriteJobs,title:"Favourites",active:"favourite"});
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

exports.getIndex = (req,res,next) => {
    const details = Job.fetchAll().then(([details]) => {
        res.render('store/',{details:details,title:"Index Page",active:"index"});
    });      
};

exports.getJobDetails = (req,res,next) => {
    const jobId = req.params.Hid;
    Job.findById(jobId).then((jobs) => {
        if (!jobs){
            console.log("Job not found");
            res.redirect('/store/jobList');
        }
        else{
            res.render('store/jobDetails',{title:"Details",active:"jobList",job:jobs});
        }
    })
    
};



