'use strict';
module.exports = (sequelize, DataTypes) => {
  const DeviceGroup = sequelize.define('DeviceGroup', {
    name: DataTypes.STRING,
    model: DataTypes.STRING,
    firmware: DataTypes.STRING,
    firmwareHistory: DataTypes.STRING
  }, {});
  DeviceGroup.associate = function(models) {
    // associations can be defined here
    DeviceGroup.belongsTo(models.Region, {
      foreignKey: 'regionId',
      onDelete: 'CASCADE'
    })
  };
  return DeviceGroup;
};