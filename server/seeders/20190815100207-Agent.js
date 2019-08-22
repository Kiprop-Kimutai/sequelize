'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Agents', [
      {
        "tillNumber": "6575673",
        "msisdn": "0726872233",
        "active": true,
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "tillNumber": "474983",
        "msisdn": "072787323",
        "active": true,
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "tillNumber": "577463",
        "msisdn": "07176531",
        "active": true,
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "tillNumber": "979861",
        "msisdn": "0712876587",
        "active": true,
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
