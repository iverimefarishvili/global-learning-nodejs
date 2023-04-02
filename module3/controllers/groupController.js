const validateGroup = require('../utils/validateGroup').validateGroup;

const db = require("../config/index");
const Groups = db.groups;

module.exports = {
    async getGroups(req, res) {
      Groups.findAll()
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
    async getGroup(req, res) {
      const id = req.params.id;

      Groups.findByPk(id)
        .then(data => {
          res.send(data);
        })
        .catch(err => {
          res.status(500).send({
            message: "Error retrieving Tutorial with id=" + id
          });
        });
    },
    async postGroup(req, res) {
      const user = {
        id: req.body.id,
        name: req.body.name,
        permissions: req.body.permissions
      };
    
      Groups.create(user)
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
    async updateGroup(req, res) {
      const id = req.params.id;

    //   const { error } = validateGroup(req.body);
    //   if (error) return res.status(400).send(error.details[0].message);
      
      Groups.update(req.body, {
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
    async deleteGroup(req, res) {
      const id = req.params.id;

      Groups.destroy({
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
};