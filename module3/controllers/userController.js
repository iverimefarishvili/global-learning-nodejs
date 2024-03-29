const {userSchema} = require('../utils/validateUser');

const db = require("../config/index");
const Users = db.users;

const wrapWithTryCatch = fn => async (req, res, next) => {
  try {
    await fn(req, res, next);
  } catch (error) {
    next(error);
  }
};

module.exports = {
    async getUsers(req, res) {
      Users.findAll()
        .then(data => {
          res.send(data);
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving tutorials."
          });
        });
    },
    async getUser(req, res) {
      const id = req.params.id;

      Users.findByPk(id)
        .then(data => {
          res.send(data);
        })
        .catch(err => {
          res.status(500).send({
            message: "Error retrieving Tutorial with id=" + id
          });
        });
    },
    async postUser(req, res) {
      const { error } = userSchema.validate(req.body);

      if (error) return res.status(400).send(error.details[0].message);
    
      const user = {
        login: req.body.login,
        password: req.body.password,
        age: req.body.age,
        is_deleted: req.body.is_deleted,
      };
    
      Users.create(user)
        .then(data => {
          res.send(data);
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the User."
          });
        });
    },
    async updateUser(req, res) {
      const id = req.params.id;

      const { error } = userSchema.validate(req.body);
      if (error) return res.status(400).send(error.details[0].message);

      Users.update(req.body, {
        where: { id: id }
      })
        .then(num => {
          if (num == 1) {
            res.send({
              message: "User was updated successfully."
            });
          } else {
            res.send({
              message: `Cannot update User with id=${id}. Maybe Tutorial was not found or req.body is empty!`
            });
          }
        })
        .catch(err => {
          res.status(500).send({
            message: "Error updating User with id=" + id
          });
        });
    },
    async deleteUser(req, res) {
      const id = req.params.id;

      Users.destroy({
        where: { id: id }
      })
        .then(num => {
          if (num == 1) {
            res.send({
              message: "User was deleted successfully!"
            });
          } else {
            res.send({
              message: `Cannot delete User with id=${id}. Maybe Tutorial was not found!`
            });
          }
        })
        .catch(err => {
          res.status(500).send({
            message: "Could not delete User with id=" + id
          });
        });
    },
    async addUserToGroup(userId, groupId) {
      Users.addGroup(userId, groupId);
    }
};