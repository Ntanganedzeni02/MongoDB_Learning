const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri = process.env.ATLAS_URI;
const client = new MongoClient(uri);

const pipeline = [
    { $match: { balance: { $gt: 200 } } },
    {
        $group: {
            _id: "$accountId",
            totalBalance: { $sum: "$balance" },
            averageBalance: { $avg: "$balance" }
        }
    },
    {
        $sort: { totalBalance: -1 }
    },
    {
        $project: {
            _id: 0,
            accountId: "$_id",
            totalBalance: 1,
            averageBalance: 1
        }   
    }
];

const main = async () => {
    try {
        await client.connect();
        console.log("Connected to MongoDB Atlas");

        const db = client.db("bank");
        const accountsCollection = db.collection("accounts");

        const results = await accountsCollection.aggregate(pipeline).toArray();
        console.log("accounts by balance:", results);
        
    } catch (error) {
        console.error("An error occurred in the main function:", error);
    } finally {
        await client.close();
    }
};

main().catch(console.error);
