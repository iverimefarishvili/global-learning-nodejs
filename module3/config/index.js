const dbConfig = require("./db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("../models/user.model")(sequelize, Sequelize);
db.groups = require("../models/group.model")(sequelize, Sequelize);

db.users.belongsToMany(db.groups, {
  through: "UserGroup",
  as: "users",
  foreignKey: "user_id",
});

db.groups.belongsToMany(db.users, {
  through: "UserGroup",
  as: "groups",
  foreignKey: "group_id",
});

module.exports = db;