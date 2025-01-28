const {getDB} = require('../utils/databaseUtil');
const {ObjectId} = require('mongodb');

module.exports = class Profile{
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
            return db.collection('profiles').updateOne({_id:new ObjectId(String(this._id))},{$set:updateFields})
        }
        else{
            // to insert 
            return db.collection('profiles').insertOne(this);
        }
    };

    static fetchAll(){
        const db = getDB();
        return db.collection('profiles').find().toArray();
    }

    static findById(profileId){
        const db = getDB();
        return db.collection('profiles').find({_id:new ObjectId(String(profileId))}).next();
    }

    static deleteById(profileId,callback){
        const db = getDB();
        return db.collection('jobs').deleteOne({_id:new ObjectId(String(profileId))});
    }
}
