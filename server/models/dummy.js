'use strict';
module.exports = (sequelize, DataTypes) => {
  const Dummy = sequelize.define('Dummy', {
    firstname: DataTypes.STRING,
    middlename: DataTypes.STRING
  }, {});
  Dummy.associate = function(models) {
    // associations can be defined here
  };
  return Dummy;
};