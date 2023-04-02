module.exports = db => {
    const router = require('express').Router();
  
    const { GET_GROUP, GET_GROUPS, POST_GROUP, UPDATE_GROUP, DELETE_GROUP } = require('../links/links').groups;
    const validateGroupMiddleware = require('../middlewares/validateGroupMiddleware');
    const { getGroups, getGroup, postGroup, updateGroup, deleteGroup } = require('../controllers/GroupController');
  
    
    router.get(GET_GROUP, getGroup);
    router.get(GET_GROUPS, getGroups);
    router.post(POST_GROUP,postGroup);
    router.post(UPDATE_GROUP, updateGroup);
    router.delete(DELETE_GROUP, deleteGroup);
  
    return router;
  };