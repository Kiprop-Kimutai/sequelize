'use strict';
module.exports = (sequelize, DataTypes) => {
  const Accessory = sequelize.define('Accessory', {
    serialno: DataTypes.STRING,
    model: DataTypes.STRING,
    issued: DataTypes.BOOLEAN,
    attachmentHistory: DataTypes.STRING,
    active: DataTypes.BOOLEAN
  }, {});
  Accessory.associate = function(models) {
    // associations can be defined here
    Accessory.belongsTo(models.Device, {
      foreignKey: 'deviceId',
      onDelete: 'CASCADE'
    })
  };
  return Accessory;
};