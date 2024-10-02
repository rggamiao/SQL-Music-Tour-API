'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Band extends Model {
    static associate(models) {
      // define association here
    }
  }
  Band.init({
    name: DataTypes.STRING,
    genre: DataTypes.STRING,
    // Add other fields as needed
  }, {
    sequelize,
    modelName: 'Band',
  });
  return Band;
};