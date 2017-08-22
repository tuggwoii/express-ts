'use strict';
module.exports = {
    up: function (queryInterface, Sequelize) {

        return queryInterface.createTable('Users', {
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
            FacebookId: {
                type: Sequelize.STRING(20),
                allowNull: true
            },
            GoogleId: {
                type: Sequelize.STRING(20),
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
            LastRefreshToken: {
                type: Sequelize.DATE,
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

        return queryInterface.dropTable('Users');

    }
};
