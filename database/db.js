const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://aoall:Tasmania123@cluster0.buqds.mongodb.net/AICyber?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


let dbConnection;


module.exports = {
    connectToDatabase: function (callback) {
        client.connect(function (err, db) {
            if (err || !db) {
                return callback(err);
            }

            dbConnection = db.db("AICyberCollection");
            console.log("Connect to mongoDb atlas");

            return callback();
        });
    },

    getDb: function () {
        return dbConnection;
    },
    disconnect : () => {
        client.close();
    }
}
