// Description: This script connects to a MongoDB Atlas database
const {MongoClient, ObjectId} = require("mongodb");
const uri = require("./atlas_uri");

console.log(uri);
const client = new MongoClient(uri);

// Function to connect to MongoDB Atlas
const connect = async () => {
    try {
        await client.connect();
        console.log("Connected to MongoDB Atlas");
        const db = client.db(dbName);
        console.log(`Database selected: ${db.databaseName}`);
    } catch (error) {
        console.error("Error connecting to MongoDB Atlas:", error);
    } finally {
        await client.close();
    }
};

module.exports = { client, connect };