'use strict';
module.exports = (sequelize, DataTypes) => {
  const Beneficiary = sequelize.define('Beneficiary', {
    firstname: DataTypes.STRING,
    middlename: DataTypes.STRING,
    lastname: DataTypes.STRING,
    phone: DataTypes.STRING,
    idnumber: DataTypes.STRING,
    county: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
    cardnumber: DataTypes.STRING,
    programvalidity: DataTypes.DATE
  }, {});
  Beneficiary.associate = function(models) {
    // associations can be defined here
  };
  return Beneficiary;
};