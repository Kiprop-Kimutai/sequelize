'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
      "email": "jacktie.k@gmail.com",
      "username": "Jack",
      "role": "uatuser",
      "active": true,
      "hash": "",
      "salt": "",
      "createdAt": new Date(),
      "updatedAt": new Date()
      },
      {
        "email": "alexkibii@gmail.com",
        "username": "alex",
        "role": "uatuser",
        "active": false,
        "hash": "",
        "salt":"",
        "createdAt": new Date(),
        "updatedAt": new Date()
      }
  ], {})
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
