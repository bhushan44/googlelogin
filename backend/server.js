const { MongoClient } = require("mongodb");

let db;

async function connectToDB() {
  try {
    const client = new MongoClient(
      "mongodb+srv://bhushan:bhushan@cluster0.clpcael.mongodb.net/auth?retryWrites=true&w=majority&appName=Cluster0",
      // { useNewUrlParser: true, useUnifiedTopology: true }
    );

    await client.connect();
    db = client.db("bhushan");
    console.log("Connected to the database successfully");
    // cb()
  } catch (e) {
    console.error("Error connecting to the database:", e.message);
    throw e; // Re-throw the error after logging it
  }
}

module.exports = { connectToDB, getDb: () => db };
