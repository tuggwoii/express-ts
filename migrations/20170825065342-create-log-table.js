'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
      return queryInterface.createTable('Logs', {
          Id: {
              type: Sequelize.INTEGER,
              primaryKey: true,
              autoIncrement: true,
              allowNull: false
          },
          Message: {
              type: Sequelize.STRING(4000),
              allowNull: false
          },
          Body: {
              type: Sequelize.STRING(4000),
              allowNull: true
          },
          StackTrace: {
              type: Sequelize.STRING(4000),
              allowNull: true
          },
          IP: {
              type: Sequelize.STRING(30),
              allowNull: false
          },
          Url: {
              type: Sequelize.STRING(500),
              allowNull: false
          },
          Status: {
              type: Sequelize.INTEGER,
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
      return queryInterface.dropTable('Logs');
  }
};
