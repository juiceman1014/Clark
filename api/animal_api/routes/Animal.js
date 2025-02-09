const express = require('express');
const router = express.Router();
const Animal = require('../models/Animal');
const{
  OK,
  BAD_REQUEST,
  NOT_FOUND
} = require('../../util/constants').STATUS_CODES;

