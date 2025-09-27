const express = require("express");
const app = express();

const { envelopes } = require("./data");

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/api/envelopes", (req, res, next) => {
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
