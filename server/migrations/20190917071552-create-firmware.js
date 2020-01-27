'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Firmwares', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      version: {
        type: Sequelize.STRING
      },
      model: {
        type: Sequelize.STRING
      },
      tag: {
        type: Sequelize.STRING
      },
      md5sum: {
        type: Sequelize.STRING,
        unique: true
      },
      base64: {
        type: Sequelize.BLOB
      },
      release_notes: {
        type: Sequelize.STRING
      },
      previous_version: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Firmwares');
  }
};