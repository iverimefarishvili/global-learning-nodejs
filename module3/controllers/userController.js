const {userSchema} = require('../utils/validateUser');

const wrapWithTryCatch = fn => async (req, res, next) => {
  try {
    await fn(req, res, next);
  } catch (error) {
    next(error);
  }
};

let users = [];

const withErrorHandling = (wrapper, controllerObj) =>
  Object.entries(controllerObj).reduce((accCur, [key, fn]) => ({ ...accCur, [key]: wrapper(fn) }), {});

module.exports = () =>
  withErrorHandling(wrapWithTryCatch, {
    async getUsers(req, res) {
      const { loginSubstring, limit } = req.query;
      const filteredUsers = users.filter(u => u.login.includes(loginSubstring) && !u.isDeleted);
      const sortedUsers = filteredUsers.sort((a, b) => a.login.localeCompare(b.login));
      const result = sortedUsers.slice(0, limit);

      res.send(result);
    },
    async getUser(req, res) {
      const user = users.find(u => u.id === req.params.id && !u.isDeleted);
  
      if (!user) return res.status(404).send('User not found');

      res.send(user);
    },
    async postUser(req, res) {
      const { error } = userSchema.validate(req.body);

      if (error) return res.status(400).send(error.details[0].message);
      const user = { ...req.body, isDeleted: false };

      users.push(user);
      res.send(user);
    },
    async updateUser(req, res) {
      const user = users.find(u => u.id === req.params.id && !u.isDeleted);

      if (!user) return res.status(404).send('User not found');
      const { error } = userSchema.validate(req.body);
      if (error) return res.status(400).send(error.details[0].message);

      Object.assign(user, req.body);
      res.send(user);
    },
    async deleteUser(req, res) {
      const user = users.find(u => u.id === req.params.id && !u.isDeleted);
      if (!user) return res.status(404).send('User not found');

      user.isDeleted = true;

      res.send('User deleted successfully');
    },
  });