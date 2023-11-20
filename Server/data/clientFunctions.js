const MongoClient = require('mongodb').MongoClient;

const localhost = "mongodb://127.0.0.1:27017";
const dbName = "TechShop";
const collectionName = "Products";
const options = {
    serverSelectionTimeoutMS: 3000,
    connectTimeoutMS: 3000,
    socketTimeoutMS: 3000,
    useUnifiedTopology: true
};

//let client;

/*async function connect() {
    try {
        client = await MongoClient.connect(localhost, options);
    } catch (err) {
        console.error(err);
        throw err; // Propagate the error
    }
}

function close() {
    if (client) {
        client.close();
    }
}

function selectCollection(dbName, collectionName) {
    if (!client) {
        throw new Error('Not connected to the database');
    }
    return client.db(dbName).collection(collectionName);
}

/*const lookByModel = async (type) => {
    try {
        await connect();
        let collection = selectCollection('TechShop', 'Products');

        let result = await collection.find({ type: type }).toArray();

        console.log("Kashkaval");
        result.forEach(element => {
            console.log(element.type);
        });
    } finally {
        close();
    }
}*/

const lookByModel = async (type) => {
    let client;
    try {
        client = await MongoClient.connect(localhost, options);

        const db = client.db(dbName);
        await db.createCollection(collectionName);

        let collection = db.collection(collectionName);
        let result = await collection.find().toArray();
        console.log("Connection complete!");
        result.forEach(element => {
            console.log(element.id);
        });
    } catch (err) {
        console.error(err);
    } finally {
        if (client) {
            client.close();
        }
    }
}

module.exports = { lookByModel };
