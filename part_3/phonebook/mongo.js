require('dotenv').config()
const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log(
    'Please provide the password as an argument: node mongo.js <password>'
  )
  process.exit(1)
}

const password = process.argv[2]
const url = `mongodb+srv://fullstackopen:${password}@cluster0.lu3diyg.mongodb.net/p3Phonebook?retryWrites=true&w=majority`

const db = mongoose
  .connect(url)
  .then(() => console.log('connected'))
  .catch((e) => console.log('Couldn\'t connect to mongodb!\n', e))

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

let query

if (process.argv.length === 3)
  query = db.then((r) =>
    Person.find({}).then((r) => {
      console.log('phonebook:')
      r.forEach((p) => console.log(p.name, p.number))
    })
  )
else if (process.argv.length >= 5)
  query = db
    .then((r) => {
      const person = new Person({
        name: process.argv[3],
        number: process.argv[4],
      })

      return person.save()
    })
    .then((addedPerson) =>
      console.log(`added ${addedPerson.name} number ${addedPerson.number} to phonebook`)
    )

if (query)
  query
    .then((r) => {
      close()
    })
    .catch((e) => console.log(e))
else {
  db.then((r) => close())
}

const close = () => {
  mongoose.connection.close()
  console.log('disconnected')
}
