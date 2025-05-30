
const {ObjectId} = require('mongodb');

module.exports = class Job{
    constructor(jobCompany,jobPost,jobLocation,jobOwnerMobile,jobOwnerEmail,description,_id){
        this.jobCompany = jobCompany;
        this.jobPost = jobPost;
        this.jobLocation = jobLocation;
        this.jobOwnerEmail = jobOwnerEmail;
        this.jobOwnerMobile = jobOwnerMobile;
        this.description = description;
        
        if(_id){
            this._id = _id;
        }
    }

    save() {
        const db = getDB();
        if(this._id){// update
            const updateFields = {jobCompany:this.jobCompany,jobPost:this.jobPost,jobLocation:this.jobLocation,jobOwnerEmail:this.jobOwnerEmail,jobOwnerMobile:this.jobOwnerMobile,description:this.description};
            return db.collection('jobs').updateOne({_id:new ObjectId(String(this._id))},{$set:updateFields})
        }
        else{
            // to insert 
            return db.collection('jobs').insertOne(this);
        }
    };

    static fetchAll(){
        const db = getDB();
        return db.collection('jobs').find().toArray();
    }

    static findById(jobId){
        const db = getDB();
        return db.collection('jobs').find({_id:new ObjectId(String(jobId))}).next();
    }

    static deleteById(jobId,callback){
        const db = getDB();
        return db.collection('jobs').deleteOne({_id:new ObjectId(String(jobId))});
    }
}
