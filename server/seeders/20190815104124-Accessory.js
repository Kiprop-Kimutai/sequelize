'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Accessories', [ 
      {
        "serialno": "657451",
        "model": "Secugen Hamster V Pro",
        "issued": true,
        "attachmentHistory": "9842567,8767642,82348819",
        "active": true,
        //"deviceId": 1,
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "serialno": "3574461",
        "model": "Secugen Hamster IV",
        "issued": true,
        "attachmentHistory": "8234567,87696542,82348819",
        "active": true,
        //"deviceId": 2,
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "serialno": "164724",
        "model": "Secugen Hamster V Pro",
        "issued": true,
        "attachmentHistory": "8234567,87696542,82348819",
        "active": true,
        //"deviceId": 3,
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "serialno": "9876543",
        "model": "Secugen Hamster IV",
        "issued": true,
        "attachmentHistory": "8234567,82348819",
        "active": true,
        //"deviceId": 4,
        "createdAt": new Date(),
        "updatedAt": new Date()
      }
    ])
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
