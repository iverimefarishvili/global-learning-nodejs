const links = {
    users: {
      GET_USER: '/users/:id',
      GET_USERS: '/users',
      POST_USER: '/users/:id',
      UPDATE_USER: '/user:id',
      DELETE_USER: '/user'
    },
    groups: {
      GET_GROUP: '/groups/:id',
      GET_GROUPS: '/groups',
      POST_GROUP: '/groups',
      UPDATE_GROUP: '/group:id',
      DELETE_GROUP: '/groups'
    }
};
  
module.exports = links;