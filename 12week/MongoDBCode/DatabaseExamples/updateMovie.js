const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, 'credentialsDontPost/.env') })  

const userName = process.env.MONGO_DB_USERNAME;
const password = process.env.MONGO_DB_PASSWORD;

 /* Our database and collection */
 const databaseAndCollection = {db: "CMSC335DB", collection:"moviesCollection"};

/****** DO NOT MODIFY FROM THIS POINT ONE ******/
const { MongoClient, ServerApiVersion } = require('mongodb');
async function main() {
    const uri = `mongodb+srv://${userName}:${password}@cluster0.mmvm8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

   
    try {
        await client.connect();
        
        console.log("***** Updating one movie *****");
        let newValues = {year: 2022, stars: 7.0};
        let targetName = "Batman";
        await updateOne(client, databaseAndCollection, targetName, newValues)
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

async function updateOne(client, databaseAndCollection, targetName, newValues) {
    let filter = {name : targetName};
    let update = { $set: newValues };

    const result = await client.db(databaseAndCollection.db)
    .collection(databaseAndCollection.collection)
    .updateOne(filter, update);

    console.log(`Documents modified: ${result.modifiedCount}`);
}

main().catch(console.error);