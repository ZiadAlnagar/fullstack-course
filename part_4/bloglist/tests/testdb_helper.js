/* eslint-disable import/no-extraneous-dependencies */

const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongo;

const connectDB = async () => {
  mongo = await MongoMemoryServer.create();
  const uri = mongo.getUri();

  await mongoose.connect(uri);
};

const dropDB = async () => {
  if (mongo) {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongo.stop();
  }
};

const dropCollections = async () => {
  if (mongo) {
    const collections = await mongoose.connection.db.collections();
    const deletePromises = collections.map((c) => c.deleteMany());
    await Promise.all(deletePromises);
    // for (const collection of collections) await collection.deleteMany();
  }
};

module.exports = { connectDB, dropDB, dropCollections };
