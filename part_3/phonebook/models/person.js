const mongoose = require("mongoose");
const { toClient } = require("../utils/utils");

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
});

toClient(personSchema);

module.exports = mongoose.model("Person", personSchema);
