const { MongoClient } = require("mongodb");

const uri = process.env.DBURL;
const client = new MongoClient(uri);
const dbNAME = process.env.DBNAME;
const database = client.db(dbNAME);

async function insertData(data) {
  const collection = database.collection(process.env.DB_COLLECTION);
  const res = await collection.insertOne(data);
  return res;
}

async function getData(id) {
  const collection = database.collection(process.env.DB_COLLECTION);
  const query = id || {};
  const res = await collection.find(query).toArray();
  return res;
}

async function updateData(id, data) {
  const collection = database.collection(process.env.DB_COLLECTION);
  const res = await collection.updateOne(id, { $set: data });
  return res;
}

client.connect((err) => {
  if (err) {
    console.error(err);
    return false;
  }
  console.log("database connected");
});
module.exports = {
  insertData,
  getData,
  updateData,
};
