'use strict';
module.exports = {
    up: function (queryInterface, Sequelize) {

        return queryInterface.createTable('Authentications', {
            Id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            Username: {
                type: Sequelize.STRING(200),
                allowNull: false
            },
            Password: {
                type: Sequelize.STRING(1000),
                allowNull: true
            },
            Token: {
                type: Sequelize.STRING(1000),
                allowNull: true
            },
            RefreshToken: {
                type: Sequelize.STRING(1000),
                allowNull: true
            },
            CreatedAt: {
                type: Sequelize.DATE,
                allowNull: false
            },
            UpdatedAt: {
                type: Sequelize.DATE,
                allowNull: false
            }
        });

    },
    down: function (queryInterface, Sequelize) {

        return queryInterface.dropTable('Authentications');

    }
};
