const mongo  = require('mongodb');

const mongoClient = mongo.MongoClient;

const mongoUrl = "mongodb+srv://mini:mini@mini.tldys.mongodb.net/";

let _db;

const mongoConnect = (callback) => {
    mongoClient.connect(mongoUrl).then(client => {
        callback();
        _db = client.db('job');
    })
    .catch(err => {
        console.log('Error while connecting to MongoDB',err);
    })
}

const getDB = () => {
    if(!_db){
       throw new Error("Mongo not connected"); 
    }
    return _db;
}
exports.mongoConnect = mongoConnect;
exports.getDB = getDB;