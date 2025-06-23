const {MongoClient} = require("mongodb");
const uri = require("./atlas_uri");

console.log(uri);
const client = new MongoClient(uri);

const dbName = "bank";
const collectionName = "accounts";
const accountsCollection = client.db(dbName).collection(collectionName);

const connectToDatabase = async () => {
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

const sampleAccount = {
    account_holder: "Phidzag Ntanga",
    account_number: "1234567890",
    balance: 1000.00,
    account_type: "savings",
    last_updated: new Date(),
};

const main = async () => {
    try {
        await client.connect();
        console.log("Connected to MongoDB Atlas");

        const db = client.db(dbName);
        console.log(`Database selected: ${db.databaseName}`);

        const accountsCollection = db.collection(collectionName);
        let result = await accountsCollection.insertOne(sampleAccount);
        console.log("Sample account inserted:", result.insertedId);
    } catch (error) {
        console.error("An error occurred in the main function:", error);
    } finally {
        await client.close();
    }
};

main();
