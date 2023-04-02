module.exports = (sequelize, Sequelize) => {
    const Users = sequelize.define("user", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        login: Sequelize.STRING,
        password: Sequelize.STRING,
        age: Sequelize.INTEGER,
        is_deleted: Sequelize.BOOLEAN,
        createdAt: {
            type: Sequelize.DATE,
            allowNull: true
        }, 
        updatedAt: {
            type: Sequelize.DATE,
            allowNull: true
        }, 
    });
  
    return Users;
};