'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Devices', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      serialno: {
        type: Sequelize.STRING,
        unique: true
      },
      model: {
        type: Sequelize.STRING
      },
      kernel: {
        type: Sequelize.STRING
      },
      group: {
        type: Sequelize.STRING
      },
      firmware: {
        type: Sequelize.STRING
      },
      assigned_firmware: {
        type: Sequelize.STRING
      },
      active: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      agentId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Agents',
          key: 'id',
          as: 'agentId'
        }
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Devices');
  }
};