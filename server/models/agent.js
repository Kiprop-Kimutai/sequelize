'use strict';
module.exports = (sequelize, DataTypes) => {
  const Agent = sequelize.define('Agent', {
    tillNumber: DataTypes.STRING,
    msisdn: DataTypes.STRING,
    active: DataTypes.BOOLEAN
  }, {});
  Agent.associate = function(models) {
    // associations can be defined here
    Agent.hasMany(models.Device, {
      foreignKey: 'agentId', as: 'devices'
    })
  };
  return Agent;
};