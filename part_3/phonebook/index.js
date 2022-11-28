const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");

morgan.token("body", (req, res) => JSON.stringify(req.body));

const morgan_custom = morgan((tokens, req, res) =>
    [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        ...(req.method === "POST" ? [tokens.res(req, res, "content-length")] : []),
        "-",
        tokens["response-time"](req, res),
        "ms",
        ...(req.method === "POST" ? [tokens.body(req, res)] : []),
    ].join(" ")
);

app.use(express.json());
app.use(cors());
app.use(express.static("build"));
app.use(morgan_custom);

const MAX = 10000000;

const generateId = () => Math.floor(Math.random() * MAX);

const personsLen = () => persons.length;

let persons = [
    {
        id: 1,
        name: "Arto Hellas",
        number: "040-123456",
    },
    {
        id: 2,
        name: "Ada Lovelace",
        number: "39-44-5323523",
    },
    {
        id: 3,
        name: "Dan Abramov",
        number: "12-43-234345",
    },
    {
        id: 4,
        name: "Mary Poppendieck",
        number: "39-23-6423122",
    },
];

app.get("/api/persons", (request, response) => response.json(persons));

app.post("/api/persons", (request, response) => {
    const body = request.body;
    const required = ["name", "number"];
    if (!body.name || !body.number)
        return response.status(400).json({
            error: required
                .filter((r) => !(r in body))
                .map((r) => `${r} missing`)
                .join(" "),
        });
    else if (persons.find((p) => p.name === body.name))
        return response.status(422).json({ error: "name must be unique" });

    const person = {
        id: generateId(),
        name: body.name,
        number: body.number,
    };

    persons = persons.concat(person);

    response.json(person);
});

app.get("/api/persons/:id", (request, response) => {
    const id = Number(request.params.id);
    const person = persons.find((p) => p.id === id);
    if (!person) return response.status(404).end();
    response.json(person);
});

app.delete("/api/persons/:id", (request, response) => {
    const id = Number(request.params.id);
    persons = persons.filter((p) => p.id !== id);

    response.status(204).end();
});

app.get("/info", (request, response) => {
    const info = `
        <p>Phonebook has info for ${personsLen()}</p>
        <p>${new Date()}</p>`;

    response.send(info);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
