const {getDB} = require('../utils/databaseUtil');
const {ObjectId} = require('mongodb');

module.exports = class Profile{
    constructor(profileName,profileGender,profilePost,profileCourse,profileSkills,profileEmail,profileMobile,profileTenth,profileTwelth,profileGraduation,profileDescription,profilePostDescription,_id){
        this.profileName = profileName;
        this.profileGender = profileGender;
        this.profilePost = profilePost;
        this.profileCourse = profileCourse;
        this.profileSkills = profileSkills;
        this.profileEmail  = profileEmail;
        this.profileMobile = profileMobile;
        this.profileTenth = profileTenth;
        this.profileTwelth = profileTwelth;
        this.profileGraduation = profileGraduation;
        this.profileDescription = profileDescription;
        this.profilePostDescription = profilePostDescription;
        
        if(_id){
            this._id = _id;
        }
    }

    save() {
        const db = getDB();
        if(this._id){// update
            const updateFields = {profileName:this.profileName,profileGender:this.profileGender,profilePost:this.profilePost,profileCourse:this.profileCourse,profileSkills:this.profileSkills,profileEmail:this.profileEmail,profileMobile:this.profileMobile,profileTenth:this.profileTenth,profileTwelth:this.profileTwelth,profileGraduation:this.profileGraduation,profileDescription:this.profileDescription,profilePostDescription:this.profilePostDescription};
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
        return db.collection('profiles').deleteOne({_id:new ObjectId(String(profileId))});
    }
}
