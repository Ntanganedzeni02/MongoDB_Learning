
const { client, connect } = require("./db.js");

// Database and collection names
const dbName = "bank";
const collectionName = "accounts";

// Sample accounts array to insert into the database
const sampleAccounts = [
    {
        account_holder: "Phidzag Ntanga",
        account_number: "1234567890",
        balance: 1000.00,
        account_type: "savings",
        last_updated: new Date()
    },
    {
        account_holder: "Phidzag Rofhiwa",
        account_number: "1234567891",
        balance: 499.00,
        account_type: "savings",
        last_updated: new Date()
    },
    {
        account_holder: "Phidzag Sesi",
        account_number: "1234567892",
        balance: 500.00,
        account_type: "savings",
        last_updated: new Date()
    }
];

// Main function to insert accounts
const main = async () => {
    try {
        await client.connect();
        console.log("Connected to MongoDB Atlas");

        const db = client.db(dbName);
        console.log(`Database selected: ${db.databaseName}`);

        const accountsCollection = db.collection(collectionName);

        let result = await accountsCollection.insertMany(sampleAccounts);
        console.log("Sample accounts inserted:", result.insertedIds);

    } catch (error) {
        console.error("An error occurred in the main function:", error);
    } finally {
        await client.close();
    }
};

main();
