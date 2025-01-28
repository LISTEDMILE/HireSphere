const {getDB} = require("../utils/databaseUtil");

module.exports = class favouriteClass{
    constructor(profileId){
        this.profileId = profileId;
    }

    save() {
        const db = getDB();
        return db.collection('favouriteProfiles').insertOne(this);
    }

    static deleteFavourite(profileId){
        const db = getDB();
        return db.collection('favouriteProfiles').deleteOne({profileId:profileId.toString()});
    }
    
    static getFavourites(){
        const db = getDB();
        return db.collection('favouriteProfiles').find().toArray();
    }
}

