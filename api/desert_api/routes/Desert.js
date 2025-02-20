const express = require('express');
const router = express.Router();
const Desert = require('../models/Desert');
const{
  OK,
  BAD_REQUEST,
  NOT_FOUND
} = require('../../util/constants').STATUS_CODES;

router.post('/createDesert', (req, res) => {
  const { rating } = req.body;
  const numberSent = !Number.isNaN(Number(rating));

  const newEvent = new Desert({
    title: req.body.title,
    description: req.body.description,
    rating: numberSent ? Number(rating) : undefined,
  });

  Desert.create(newEvent)
    .then((post) => {
      return res.json(post);
    })
    .catch(
      (error) => res.sendStatus(BAD_REQUEST)
    );
});

router.get('/getDeserts', (req, res) => {
  Desert.find()
    .then(items => res.status(OK).send(items))
    .catch(error => {
      res.sendStatus(BAD_REQUEST);
    });
});

router.post('/editDesert', (req, res) => {
  const{
    title,
    description,
    rating,
    _id,
  } = req.body;
  Desert.findOne({ _id })
    .then(Desert => {
      Desert.title = title || Desert.title;
      Desert.description = description || Desert.description;
      Desert.rating = rating || Desert.rating;
      Desert
        .save()
        .then(() => {
          res.sendStatus(OK);
        })
        .catch(() => {
          res.sendStatus(BAD_REQUEST);
        });
    })
    .catch(() => {
      res.sendStatus(NOT_FOUND);
    });
});

router.post('/deleteDesert', (req, res) => {
  Desert.deleteOne({ _id: req.body._id })
    .then(result => {
      if(result.n < 1){
        res.sendStatus(NOT_FOUND);
      }else{
        res.sendStatus(OK);
      }
    })
    .catch(() => {
      res.sendStatus(BAD_REQUEST);
    });
});

module.exports = router;
