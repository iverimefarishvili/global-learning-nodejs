module.exports = (sequelize, Sequelize) => {
    const Groups = sequelize.define("group", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        name: Sequelize.STRING,
        permissions: Sequelize.JSON,
        createdAt: {
            type: Sequelize.DATE,
            allowNull: true
        }, 
        updatedAt: {
            type: Sequelize.DATE,
            allowNull: true
        }, 
    });
  
    return Groups;
};