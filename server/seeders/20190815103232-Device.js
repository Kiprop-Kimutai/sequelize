'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Devices', [
      {
        "serialno": "82348718",
        "model": "NEW8210",
        "kernel": "1.1.3-aa",
        "group": "uat",
        "firmware": "1.3.4",
        "assigned_firmware": "2.0.0",
        "active": true,
        //"agentId":1,
        "createdAt": new Date(),
        "updatedAt": new Date()
        },
        {
          "serialno": "82356738",
          "model": "NEW8210",
          "kernel": "1.1.3-aa",
          "group": "uat",
          "firmware": "1.3.4",
          "assigned_firmware": "2.0.0",
          "active": true,
          //"agentId":2,
          "createdAt": new Date(),
          "updatedAt": new Date()
        },
        {
          "serialno": "82542318",
          "model": "NEW8210",
          "kernel": "1.1.3-aa",
          "group": "uat",
          "firmware": "1.3.4",
          "assigned_firmware": "2.0.0",
          "active": true,
          //"agentId":3,
          "createdAt": new Date(),
          "updatedAt": new Date()
        },
        {
          "serialno": "823443518",
          "model": "NEW8210",
          "kernel": "1.1.3-aa",
          "group": "uat",
          "firmware": "1.3.4",
          "assigned_firmware": "2.0.0",
          "active": true,
          //"agentId":4,
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
