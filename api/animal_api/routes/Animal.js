const express = require('express');
const router = express.Router();
const Animal = require('../models/Animal');
const{
  OK,
  BAD_REQUEST,
  NOT_FOUND
} = require('../../util/constants').STATUS_CODES;

router.post('/createAnimal', (req, res) => {
  const { lifespan } = req.body;
  const numberSent = !Number.isNaN(Number(lifespan));

  const newEvent = new Animal({
    name: req.body.name,
    description: req.body.description,
    lifespan: numberSent ? Number(lifespan) : undefined,
  });

  Animal.create(newEvent)
    .then((post) => {
      return res.json(post);
    })
    .catch(
      (error) => res.sendStatus(BAD_REQUEST)
    );
});
