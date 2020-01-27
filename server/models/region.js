'use strict';
module.exports = (sequelize, DataTypes) => {
  const Region = sequelize.define('Region', {
    name: DataTypes.STRING,
    latitude: DataTypes.FLOAT,
    longitude: DataTypes.FLOAT
  }, {});
  Region.associate = function(models) {
    // associations can be defined here
    Region.hasMany(models.DeviceGroup, {
      foreignKey: 'regionId', as: 'deviceGroups'
    })
  };
  return Region;
};