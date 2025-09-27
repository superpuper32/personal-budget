const express = require("express");
const app = express();

const bodyParser = require("body-parser");

const { envelopes } = require("./data");
const { getIndexById, getElementById, updateElement } = require("./utils");

app.use(bodyParser.json());

app.use("/api/envelopes/:id", (req, res, next) => {
    const envelopeID = req.params.id;
    const foundEnvelope = getElementById(envelopeID, envelopes);
    if (!foundEnvelope) {
      return res.status(404).send("Envelope with that id does not exist");
    }
    req.envelope = foundEnvelope;
    req.envelopeID = envelopeID;
    next()
});

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
    res.send(req.envelope);
});

app.put("/api/envelopes/:id", (req, res) => {
    const envelopeID = req.envelopeID;
    const { title, budget } = req.body;
    updateElement(envelopeID, { title, budget: String(budget) }, envelopes);
    res.send(req.envelope);
});

app.delete("/api/envelopes/:id", (req, res) => {
  const envelopeIndex = getIndexById(req.envelopeID, envelopes);
  envelopes.splice(envelopeIndex, 1);
  res.status(204).send();
});

app.post("/api/envelopes", (req, res) => {
    const { budget, title } = req.body;

    if (budget && title) {
      const envelopeID = envelopes.length + 1;
      const envelopeObject = { id: envelopeID, budget: String(budget), title };
      envelopes.push(envelopeObject);

      res.status(201).send({ envelope: envelopeObject });
    } else {
      res.status(403).send();
    }
});

module.exports = {
  app,
};
