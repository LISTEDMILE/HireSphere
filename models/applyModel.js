const {getDB} = require("../utils/databaseUtil");

module.exports = class applyClass{
    constructor(jobId){
        this.jobId = jobId;
    }

    save() {
        const db = getDB();
        return db.collection('apply').insertOne(this);
    }

    static deleteApply(jobId){
        const db = getDB();
        return db.collection('apply').deleteOne({jobId:jobId.toString()});
    }
    
    static getApply(){
        const db = getDB();
        return db.collection('apply').find().toArray();
    }
}

