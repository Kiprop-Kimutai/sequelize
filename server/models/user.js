'use strict';
const crypto = require('crypto');
var jwt = require('jsonwebtoken');
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email:  DataTypes.STRING,
    username: DataTypes.STRING,
    role: DataTypes.STRING,
    active: DataTypes.BOOLEAN,
    hash: DataTypes.STRING,
    salt: DataTypes.STRING
  }, {});
  User.prototype.setPassword = function(password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
  }
  /*User.hook('beforeCreate', (user) => {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(user.password, this.salt, 1000, 64, 'sha512').toString('hex');
  })*/
  /*User.beforeCreate(user => {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(user.password, this.salt, 1000, 64, 'sha512').toString('hex');
  })*/
  User.prototype.validPassword = function(password) {
    var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
    return this.hash === hash;
  }
  User.prototype.generateJwt = function() {
    var expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);
  
    return jwt.sign({
      id: this.id,
      email: this.email,
      name: this.username,
      exp: parseInt(expiry.getTime() / 1000),
    }, process.env.api_key); // DO NOT KEEP YOUR SECRET IN THE CODE!
  }
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};