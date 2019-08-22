'use strict';
module.exports = (sequelize, DataTypes) => {
  const Device = sequelize.define('Device', {
    serialno: DataTypes.STRING,
    model: DataTypes.STRING,
    kernel: DataTypes.STRING,
    group: DataTypes.STRING,
    firmware: DataTypes.STRING,
    assigned_firmware: DataTypes.STRING,
    active: DataTypes.BOOLEAN
  }, {});
  Device.associate = function(models) {
    // associations can be defined here
    Device.belongsTo(models.Agent, {
      foreignKey: 'agentId',
      onDelete: 'CASCADE'
    });
    Device.hasMany(models.Accessory, {
      foreignKey: 'deviceId', as: 'accessories'
    });
  };
  return Device;
};