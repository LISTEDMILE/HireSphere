const {getDB} = require("../utils/databaseUtil");

module.exports = class favouriteClass{
    constructor(jobId){
        this.jobId = jobId;
    }

    save() {
        const db = getDB();
        return db.collection('favourites').insertOne(this);
    }

    static deleteFavourite(jobId){
        const db = getDB();
        return db.collection('favourites').deleteOne({jobId:jobId.toString()});
    }
    
    static getFavourites(){
        const db = getDB();
        return db.collection('favourites').find().toArray();
    }
}

