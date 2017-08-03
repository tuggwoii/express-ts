'use strict';

module.exports = {
    up: function (queryInterface, Sequelize) {

        return queryInterface.createTable('Roles', {
            Id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            Name: {
                type: Sequelize.STRING(200),
                allowNull: false
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

        return queryInterface.dropTable('Roles');

    }
};
