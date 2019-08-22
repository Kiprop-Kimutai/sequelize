'use strict';
module.exports = (sequelize, DataTypes) => {
  const File = sequelize.define('File', {
    name: DataTypes.STRING,
    type: DataTypes.STRING,
    md5sum: {type: DataTypes.STRING, unique: true}
  }, {});
  File.associate = function(models) {
    // associations can be defined here
  };
  return File;
};