// Description: This script connects to a MongoDB Atlas database
const {MongoClient, ObjectId} = require("mongodb");

require("dotenv").config();

const uri = process.env.MONGODB_URI || "mongodb+srv://<username>:<password>@cluster.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri);

// Database and collection names
const dbName = "bank";
const collectionName = "accounts";
const accountsCollection = client.db(dbName).collection(collectionName);

const accounts = client.db(dbName).collection(collectionName);
const transfer = client.db(dbName).collection("transfer");

let account_id_sender = "1234567890";
let account_id_receiver = "0987654321";
let transfer_amount = 100;

const session = client.startSession();

const main = async () => {
    try {
        const transactionResult = await session.withTransaction(async () => {
            //update sender's account balance
            const updateSenderResults = await accounts.updateOne(
                { account_number: account_id_sender },
                { $inc: { balance: -transfer_amount } },
                { session }
            );

        console.log(`${updateSenderResults.matchedCount} Sender's account updated:`, updateSenderResults.modifiedCount);

            //update receiver's account balance
            const updateReceiverResults = await accounts.updateOne(
                { account_number: account_id_receiver },
                { $inc: { balance: transfer_amount } },
                { session }
            );

        console.log(`${updateReceiverResults.matchedCount} Receiver's account updated:`, updateReceiverResults.modifiedCount);
            //insert transfer record
            const transferRecord = {
                sender_account: account_id_sender,
                receiver_account: account_id_receiver,
                amount: transfer_amount,
                date: new Date()
            };

            const insertTransferResults = await transfer.insertOne(transferRecord, { session });
            console.log("Transfer record inserted:", insertTransferResults.insertedId);

            return true; // Transaction successful
        });

        //update the transfer complete field for the sender's account
        const updateTransferComplete = await accounts.updateOne(
            { account_number: account_id_sender },
            { $set: { transfer_complete: true } },
            { session }
        );

        console.log(`${updateTransferComplete.matchedCount} Sender's account transfer status updated:`, updateTransferComplete.modifiedCount);

        //update the transfer complete field for the receiver's account
        const updateReceiverTransferComplete = await accounts.updateOne(
            { account_number: account_id_receiver },
            { $set: { transfer_complete: true } },
            { session }
        );

        console.log(`${updateReceiverTransferComplete.matchedCount} Receiver's account transfer status updated:`, updateReceiverTransferComplete.modifiedCount);

        console.log("Committing transaction...");

        if (transactionResult) {
            console.log("Transaction completed successfully.");
        }else {
            console.log("Transaction failed.");
        }
    } catch (error) {
        console.error("An error occurred in the main function:", error);
        await session.abortTransaction();
        console.log("Transaction aborted.");
    } finally {
        session.endSession();
        await client.close();
    }
};

main();
