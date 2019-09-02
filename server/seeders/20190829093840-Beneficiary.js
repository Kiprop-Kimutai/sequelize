'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Beneficiaries', [
      {
        "firstname": "Euphegenia",
        "middlename": "DoubtFire",
        "lastname": "Michael",
        "phone": "25471978654" ,
        "idnumber": "123453",
        "county": "Samburu",
        "status": 1,
        "cardnumber": "647264724622",
        "programvalidity": new Date(),
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "firstname": "Loporon",
        "middlename": "Ebei",
        "lastname": "Kayap",
        "phone": "2547196444" ,
        "idnumber": "7486422",
        "county": "Turkana",
        "status": 1,
        "cardnumber": "647264724623",
        "programvalidity": new Date(),
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "firstname": "Michael",
        "middlename": "Lopotet",
        "lastname": "Ekai",
        "phone": "25471748654" ,
        "idnumber": "97468242",
        "county": "Turkana",
        "status": 1,
        "cardnumber": "647264724624",
        "programvalidity": new Date(),
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "firstname": "Dibo",
        "middlename": "Tura",
        "lastname": "Dabasso",
        "phone": "2547197554" ,
        "idnumber": "9462883",
        "county": "Marsabit",
        "status": 0,
        "cardnumber": "647264724625",
        "programvalidity": new Date(),
        "createdAt": new Date(),
        "updatedAt": new Date()
      }
    ], {});
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
