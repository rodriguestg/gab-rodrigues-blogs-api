const express = require('express');
const categoriesController = require('../controllers/categories.controller');
const validationJwt = require('../controllers/middlewares/validationJwt.middleware');

const router = express.Router();

router.post(
  '/',
  validationJwt,
  categoriesController.createCategories,
);

router.get(
  '/',
  validationJwt,
  categoriesController.getAll,
);

module.exports = router;
