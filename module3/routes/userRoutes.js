module.exports = db => {
  const router = require('express').Router()
  const userController = require('../controllers/authorizationController')
  const { signup, login } = userController
  const userAuth = require('../Middlewares/userAuth')

  const { GET_USER, GET_USERS, POST_USER, UPDATE_USER, DELETE_USER } = require('../links/links').users;
  const validateUserMiddleware = require('../middlewares/validateUserMiddleware');
  const { getUsers, getUser, postUser, updateUser, deleteUser } = require('../controllers/userController');

  router.post('/signup', userAuth.saveUser, signup)
  router.post('/login', login )
  
  router.get(GET_USER, getUser);
  router.get(GET_USERS, getUsers);
  router.post(POST_USER, validateUserMiddleware ,postUser);
  router.post(UPDATE_USER, validateUserMiddleware, updateUser);
  router.delete(DELETE_USER, deleteUser);

  return router;
};