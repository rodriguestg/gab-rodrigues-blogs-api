const express = require('express');
const usersController = require('../controllers/users.controller');
const { validationUser } = require('../controllers/middlewares/validationsUser.middleware');

const router = express.Router();

router.post(
  '/',
  validationUser,
  usersController.createUser,
);

module.exports = router;
