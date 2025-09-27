const express = require("express");
const app = express();

const { envelopes } = require("./data");
const { getElementById } = require("./utils");

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/api/envelopes", (req, res) => {
  if (envelopes) {
    res.send({ envelopes });
  } else {
    res.status(404).send();
  }
});

app.get("/api/envelopes/:id", (req, res) => {
    const foundEnvelope = getElementById(req.params.id, envelopes);
    if (foundEnvelope) {
      res.send(foundEnvelope);
    } else {
      res.status(404).send();
    }
});

app.post("/api/envelopes", (req, res) => {
    const { budget, title } = req.query;

    if (budget && title) {
      const envelopeID = envelopes.length + 1;
      const envelopeObject = { id: envelopeID, budget, title };
      envelopes.push(envelopeObject);

      res.status(201).send({ envelope: envelopeObject });
    } else {
      res.status(403).send();
    }
});

module.exports = {
  app,
};
