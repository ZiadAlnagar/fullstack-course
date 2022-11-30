require('dotenv').config()
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const Person = require('./models/person')

const app = express()

morgan.token('body', (req, res) => JSON.stringify(req.body))

const morganLogger = morgan((tokens, req, res) =>
  [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    ...(req.method === 'POST' ? [tokens.res(req, res, 'content-length')] : []),
    '-',
    tokens['response-time'](req, res),
    'ms',
    ...(req.method === 'POST' ? [tokens.body(req, res)] : []),
  ].join(' ')
)

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(morganLogger)

app.get('/api/persons', (request, response, next) =>
  Person.find({})
    .then((r) => response.json(r))
    .catch((e) => next(e))
)

app.post('/api/persons', (request, response, next) => {
  const body = request.body

  if (isPersonDataMissing(body, response)) return

  Person.findOne({ name: body.name })
    .then((foundPerson) => {
      if (foundPerson)
        return response.status(403).json({
          error: `${foundPerson.name} already exists in the phonebook`,
        })

      const person = new Person({
        name: body.name,
        number: body.number,
      })

      person
        .save()
        .then((savedPerson) => response.json(savedPerson))
        .catch((e) => next(e))
    })
    .catch((e) => next(e))
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then((person) => {
      if (!person) return response.status(404).end()
      response.json(person)
    })
    .catch((e) => next(e))
})

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body

  if (isPersonDataMissing(body, response)) return

  const person = {
    name: body.name,
    number: body.number,
  }

  Person.findByIdAndUpdate(request.params.id, person, {
    new: true,
    runValidators: true,
    context: 'query',
  })
    .then((updatedPerson) => {
      if (!updatedPerson) return response.status(404).end()
      response.json(updatedPerson)
    })
    .catch((e) => next(e))
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then((r) => response.status(204).end())
    .catch((e) => next(e))
})

app.get('/info', (request, response, next) => {
  Person.count()
    .then((count) => {
      const info = `<p>Phonebook has info for ${count}</p><p>${new Date()}</p>`
      response.send(info)
    })
    .catch((e) => next(e))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  switch (error.name) {
  case 'CastError':
    return response.status(400).send({ error: 'malformatted id' })
  case 'ValidationError':
    return response.status(400).json({ error: error.message })

  default:
    response.status(500).end()
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

const isPersonDataMissing = (body, response) => {
  if (!body.name || !body.number) {
    const required = ['name', 'number']
    return response.status(400).json({
      error: required
        .filter((field) => !(field in body) || body[field] === '')
        .map((field) => `${field} is missing`)
        .join(', '),
    })
  }
}
