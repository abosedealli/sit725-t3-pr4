const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://aoall:Tasmania123@cluster0.buqds.mongodb.net/AICyber?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


let dbConnection;


module.exports = {
    connectToDatabase: function (calback) {
        client.connect(function (err, db) {
            if (err || !db) {
                return calback(err);
            }

            dbConnection = db.db("AICyberCollection");
            console.log("Connect to mongo atlas");

            return calback();
        });
    },

    getDb: function () {
        return dbConnection;
    }
}