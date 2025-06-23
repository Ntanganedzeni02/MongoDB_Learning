const { client, connect } = require("./db.js");

// Database and collection names
const dbName = "bank";
const collectionName = "accounts";

// Document to update in the collection and increment the balance
const documentToUpdate = { _id: new ObjectId('6859c56aad4021d7ff59e4c2') };
const update = { $inc: { balance: 100 } };

const main = async () => {
    try {
        await connect();
        console.log("Connected to MongoDB Atlas");

        const db = client.db(dbName);
        console.log(`Database selected: ${db.databaseName}`);

        const accountsCollection = db.collection(collectionName);

        let result = await accountsCollection.updateOne(documentToUpdate, update);
        result.modifiedCount == 1
            ? console.log("Document updated:", result.modifiedCount)
            : console.log("Document not updated");
        console.log("Matched count:", result.matchedCount);

    } catch (error) {
        console.error("An error occurred in the main function:", error);
    } finally {
        await client.close();
    }
};

main();
