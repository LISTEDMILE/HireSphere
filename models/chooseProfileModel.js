const {getDB} = require("../utils/databaseUtil");

module.exports = class chooseProfileClass{
    constructor(profileId){
        this.profileId = profileId;
    }

    save() {
        const db = getDB();
        return db.collection('profiles').insertOne(this);
    }

    static deleteChoosen(profileId){
        const db = getDB();
        return db.collection('profiles').deleteOne({profileId:profileId.toString()});
    }
    
    static getChooseProfiles(){
        const db = getDB();
        return db.collection('profiles').find().toArray();
    }
}

