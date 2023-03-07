module.exports = db => {
  const router = require('express').Router();

  const { GET_USER, GET_USERS, POST_USER, UPDATE_USER, DELETE_USER } = require('../links/links').resources;
  const validateUserMiddleware = require('../middlewares/validateUserMiddleware');
  const { getUsers, getUser, postUser, updateUser, deleteUser } = require('../controllers/userController');

  router.get(GET_USER, getUser);
  router.get(GET_USERS, getUsers);
  router.get(POST_USER, validateUserMiddleware ,postUser);
  router.get(UPDATE_USER, validateUserMiddleware, updateUser);
  router.get(DELETE_USER, deleteUser);

  return router;
};