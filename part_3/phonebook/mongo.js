require("dotenv").config();
const mongoose = require("mongoose");

if (process.argv.length < 3) {
    console.log("Please provide the password as an argument: node mongo.js <password>");
    process.exit(1);
}

const project = process.env.DB_PROJECT;
const cluster = process.env.DB_CLUSTER;
const dbname = process.env.DB_NAME;
const username = process.env.DB_USERNAME;
const password = process.argv[2];
const url = `mongodb+srv://${username}:${password}@${cluster}.${project}.mongodb.net/${dbname}?retryWrites=true&w=majority`;

const db = mongoose
    .connect(url)
    .then(r => console.log("connected"))
    .catch(e => console.log("Couldn't connect to mongodb!\n", e));

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
});

const Person = mongoose.model("Person", personSchema);

let query;

if (process.argv.length === 3)
    query = db.then(r =>
        Person.find({}).then(r => {
            console.log("phonebook:");
            r.forEach(p => console.log(p.name, p.number))
        })
    );
else if (process.argv.length >= 5)
    query = db
        .then(r => {
            const person = new Person({
                name: process.argv[3],
                number: process.argv[4],
            });

            return person.save();
        })
        .then(r => console.log(`added ${r.name} number ${r.number} to phonebook`));

query
    .then(r => {
        mongoose.connection.close();
        console.log("disconnected");
    })
    .catch(e => console.log('last', e));