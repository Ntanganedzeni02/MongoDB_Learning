const {MongoClient} = require("mongodb");
const uri = require("./atlas_uri");

console.log(uri);
const client = new MongoClient(uri);

const dbName = "learning";

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

const main = async () => {
    try {
        await connectToDatabase();
    } catch (error) {
        console.error("An error occurred in the main function:", error);
    } finally {
        await client.close();
    }
};

main();
