const favouriteClass = require('../models/favouriteModel');
const Job = require('../models/firstmodel');

exports.addJobGet = (req,res,next) => {
    res.render('host/addJob',{active:"addJob",title:"Add Job",editing:false});
};



exports.addJobPost = (req,res,next) => {
    const job = new Job(req.body.jobCompany,req.body.jobPost,req.body.jobLocation,req.body.jobOwnerEmail,req.body.jobOwnerMobile,req.body.description);
    job.save();
    res.render('host/addedJob',{active:"addJobPost",title:"Job Added"});
};

exports.getEditJob = (req,res,next) => {
    const jobId = req.params.jobId;
    const editing = req.query.editing === 'true';
    Job.findById(jobId).then (job => {
        if(!job){
            console.log("Job not found");
            res.redirect("host/hostJobList");
        }
        
        res.render('host/addJob',{detail:job,active:"hostJobList",title:"Edit Job",editing:editing});
    })
    
};

exports.postEditJob = (req,res,next) => {
    const job = new Job(req.body.jobCompany,req.body.jobPost,req.body.jobLocation,req.body.jobOwnerEmail,req.body.jobOwnerMobile,req.body.description,req.body._id);
    job.save();
    res.redirect('/host/hostJobList');
};

exports.hostJobList = (req,res,next) => {
    const details = Job.fetchAll().then((details) => {
        res.render('host/hostJobList',{active:"hostJobList",title:"Post added by you",details:details});
    });
};

exports.hostJobDetails = (req,res,next) => {
    const jobId = req.params.jobId;
    Job.findById(jobId).then (job => {
        res.render('host/hostJobDetails',{detail:job,active:"hostJobList",title:"Required Job"});
    })
};


exports.postDeleteJob = (req,res,next) => {
    const jobId = req.params.jobId;
    Job.deleteById(jobId)
    .then((jobId) => {
        favouriteClass.getFavourites().then(favourites => {
            favourites = favourites.map(fav => fav.jobId);
            if(favourites.includes(jobId)){
                favouriteClass.deleteFavourite(jobId);
            }
        })
    })
    .then(() => {res.redirect('/host/hostJobList');})
    .catch(error=>{
        console.log('Error deleting Job',error);
    })
}

    
        
        
    
