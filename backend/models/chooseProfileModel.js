

module.exports = class chooseProfileClass{
    constructor(profileId){
        this.profileId = profileId;
    }

    save() {
        const db = getDB();
        return db.collection('chooseProfile').insertOne(this);
    }

    static deleteChoosen(profileId){
        const db = getDB();
        return db.collection('chooseProfile').deleteOne({profileId:profileId.toString()});
    }
    
    static getChooseProfiles(){
        const db = getDB();
        return db.collection('chooseProfile').find().toArray();
    }
}

