const MongoAdapter = require('@bot-whatsapp/database/mongo');
const { MongoClient } = require('mongodb');
require('dotenv').config();

const MONGO_DB_URI = process.env.MONGO_DB_URI 
const MONGO_DB_NAME = process.env.MONGO_DB_NAME 

const client = new MongoClient(MONGO_DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

let db;

async function connectDB() {
    if (!db) {
        await client.connect();
        db = client.db(MONGO_DB_NAME);
    }
    return db;
}

async function insertOrder(phoneNumber, item, orderTime, status) {
    const db = await connectDB();
    const ordersCollection = db.collection('orders');
    const order = {
        phoneNumber,
        item,
        orderTime,
        status,
    };
    await ordersCollection.insertOne(order);
}

const adapterDB = new MongoAdapter({
    dbUri: MONGO_DB_URI,
    dbName: MONGO_DB_NAME,
    options: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
});

module.exports = { adapterDB, insertOrder };
