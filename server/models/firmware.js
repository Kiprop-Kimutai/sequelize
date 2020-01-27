'use strict';
module.exports = (sequelize, DataTypes) => {
  const Firmware = sequelize.define('Firmware', {
    version: DataTypes.STRING,
    model: DataTypes.STRING,
    tag: DataTypes.STRING,
    md5sum: DataTypes.STRING,
    base64: DataTypes.BLOB,
    release_notes: DataTypes.STRING,
    previous_version: DataTypes.STRING
  }, {});
  Firmware.associate = function(models) {
    // associations can be defined here
  };
  return Firmware;
};