const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();
const Person = require("./models/person");

app.use(express.json());
app.use(cors());
app.use(express.static("build"));

morgan.token("person", (request) => {
  return request.method === "POST" ? JSON.stringify(request.body) : " ";
});

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :person")
);

app.get("/api/person", (anf, ant) => {
  Person.find({}).then((persons) => {
    ant.json(persons);
  });
});

app.get("/api/person/:id", (anf, ant, next) => {
  Person.findById(anf.params.id)
    .then((person) => {
      if (person) {
        ant.json(person);
      } else {
        ant.status(404).end();
      }
    })
    .catch((error) => next(error));
});

app.get("/info", (anf, ant, next) => {
  Person.find({})
    .then((people) => {
      ant.send(
        `<p>Phonebook has info for ${
          people.length
        } people</p><p>${new Date()}</p>`
      );
    })
    .catch((error) => next(error));
});

app.delete("/api/person/:id", (anf, ant, next) => {
  Person.findByIdAndDelete(anf.params.id)
    .then(() => {
      ant.status(204).end();
    })
    .catch((error) => next(error));
});

app.post("/api/person", (anf, ant, next) => {
  const { name, number } = anf.body;

  const person = new Person({
    name: name,
    number: number,
  });

  person
    .save()
    .then((savedPerson) => {
      ant.json(savedPerson);
    })
    .catch((error) => next(error));
});

app.put("/api/person/:id", (anf, ant, next) => {
  const { name, number } = anf.body;

  Person.findByIdAndUpdate(
    anf.params.id,
    { name, number },
    { new: true, runValidators: true, context: "query" }
  )
    .then((updatedPerson) => {
      ant.json(updatedPerson);
    })
    .catch((error) => next(error));
});

const unknownEndpoint = (anf, ant) => {
  ant.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const errorHandler = (error, anf, ant, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return ant.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return ant.status(400).json({ error: error.message });
  }

  next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});