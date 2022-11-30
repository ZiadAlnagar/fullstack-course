const mongoose = require('mongoose')
const { toClient } = require('../utils/helpers')

const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose
  .connect(url)
  .then((r) => console.log('connected to MongoDB'))
  .catch((e) => console.log('error connecting to MongoDB:', e.message))

const numberValidator = (number) => {
  const GROUPS_LEN = 2

  const CODE = {
    min: 2,
    max: 3,
  }

  const split = number.split('-')

  if (split.length !== GROUPS_LEN) return false

  if (split[0].length > CODE.max || split[0].length < CODE.min) return false

  for (let i = 0; i < split.length; i++) {
    const num = split[i]
    if (isNaN(num) || num === ' ') return false
  }

  return true
}

const nubmerSyntax = [
  numberValidator,
  '{PATH} must consist of numbers only & follow \'XX{X}-YYYYYY...\' syntax',
]

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
  },
  number: {
    type: String,
    minLength: 8,
    validate: nubmerSyntax,
  },
})

// To JSON
toClient(personSchema)

module.exports = mongoose.model('Person', personSchema)
