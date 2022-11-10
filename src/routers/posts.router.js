const express = require('express');
const postsController = require('../controllers/posts.controller');
const { validationPost } = require('../controllers/middlewares/validationPost.middleware');
const validationJwt = require('../controllers/middlewares/validationJwt.middleware');

const router = express.Router();

router.post(
  '/',
  validationPost,
  validationJwt,
  postsController.createPost,
);

router.get(
  '/',
  validationJwt,
  postsController.getAll,
);

// router.get(
//   '/search',
//   validationJwt,
//   postsController.deleteUser,
// );

router.get(
  '/:id',
  validationJwt,
  postsController.getById,
);

// router.put(
//   '/:id',
//   validationJwt,
//   postsController.getById,
// );

// router.delete(
//   '/:id',
//   validationJwt,
//   postsController.deleteUser,
// );

module.exports = router;
