const express = require('express');
const loginController = require('../controllers/login.controller');
const { validationLogin } = require('../controllers/middlewares/validationsLogin.middleware');

const router = express.Router();

router.post(
  '/',
  validationLogin,
  loginController.getByIdAndEmail,
);

module.exports = router;
