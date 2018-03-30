"use strict";

const MongoClient = require("mongodb").MongoClient;
const MONGODB_URI = "mongodb://localhost:27017/tweeter";

MongoClient.connect(MONGODB_URI, (err, db) => {
  if(err){
    console.error(`Failed to connect: ${MONGODB_URI}`);
    throw err;
  }

  //we have a connection to the "test-tweets" db, starting here.

  console.log(`Connected to mongodb: ${MONGODB_URI}`);

  //THIS IS AN ENTRY POINT FOR A DATABASE-CONNECTED APPLICATION!
  db.collection("tweets").find({},(err, result) => {

    if (err) throw err;

    console.log("find result: ", result);
    console.log("type of find result: ", typeof result)
  })

  //CLOSE THE CONNECTION
  db.close();

});