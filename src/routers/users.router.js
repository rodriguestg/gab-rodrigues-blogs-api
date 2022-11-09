const express = require('express');
const usersController = require('../controllers/users.controller');
const { validationUser } = require('../controllers/middlewares/validationsUser.middleware');
const validationJwt = require('../controllers/middlewares/validationJwt.middleware');

const router = express.Router();

router.post(
  '/',
  validationUser,
  usersController.createUser,
);

router.get(
  '/',
  validationJwt,
  usersController.getAll,
);

router.get(
  '/:id',
  validationJwt,
  usersController.getById,
);

module.exports = router;
