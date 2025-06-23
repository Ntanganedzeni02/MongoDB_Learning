// find.js
const { client, connect } = require("./db.js");

// Database and collection names
const dbName = "bank";
const collectionName = "accounts";

// Document to find in the collection
const documentToFind = { balance: { $gt: 500 } };

const main = async () => {
    try {
        await connect();  // Call connect() from db.js

        const db = client.db(dbName);
        console.log(`Database selected: ${db.databaseName}`);

        const accountsCollection = db.collection(collectionName);

        const result = await accountsCollection.findOne(documentToFind);
        console.log("Document found:", result);
        
    } catch (error) {
        console.error("An error occurred in the main function:", error);
    } finally {
        await client.close();
    }
};

main();
