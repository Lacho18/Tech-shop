const MongoClient = require('mongodb').MongoClient;

const localhost = "mongodb://127.0.0.1:27017";
const dbName = "TechShop";
const options = {
    serverSelectionTimeoutMS: 3000,
    connectTimeoutMS: 3000,
    socketTimeoutMS: 3000,
    useUnifiedTopology: true
};

async function Connection() {
    let client;
    try {
        client = await MongoClient.connect(localhost, options);
    }
    catch(err) {
        console.error(err);
    }
    let dataBase = client.db(dbName);

    console.log('Data base selected');
    return dataBase;
}

module.exports = {Connection};