// require("dotenv").config({ path: "../.env" });
const mongoose = require("mongoose");

const project = process.env.DB_PROJECT;
const cluster = process.env.DB_CLUSTER;
const dbname = process.env.DB_NAME;
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

const url = `mongodb+srv://${username}:${password}@${cluster}.${project}.mongodb.net/${dbname}?retryWrites=true&w=majority`;

const mongo = mongoose
    .connect(url)
    .then((r) => console.log("connected to MongoDB"))
    .catch((e) => console.log("error connecting to MongoDB:", e.message));

mongo.close = (query) =>
    query
        .then((r) => {
            mongoose.connection.close();
            console.log("disconnected from MongoDB");
        })
        .catch((e) => console.log(e));

module.exports = mongo;
