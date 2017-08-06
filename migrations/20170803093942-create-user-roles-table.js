'use strict';

module.exports = {

    up: function (queryInterface, Sequelize) {

        return queryInterface.createTable('UserRoles', {
            Id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            UserId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'Users',
                    key: 'Id'
                },
                onDelete: 'cascade',
                onUpdate: 'cascade'
            },
            RoleId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'Roles',
                    key: 'Id'
                },
                onDelete: 'cascade',
                onUpdate: 'cascade'
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

        return queryInterface.dropTable('UserRoles');

    }
};
