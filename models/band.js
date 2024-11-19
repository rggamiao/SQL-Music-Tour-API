'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Band extends Model {
    static associate(models) {
      // Define associations here
      Band.hasMany(models.Event, { foreignKey: 'band_id' });
      Band.hasMany(models.MeetGreet, { foreignKey: 'band_id' });
      
      // Assuming user_relation is a model defined elsewhere
      Band.belongsTo(models.UserRelation, { foreignKey: 'user_relation_id' });
    }
  }
  
  Band.init({
    band_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    genre: DataTypes.STRING,
    user_relation_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Band',
    tableName: 'bands',
    timestamps: false
  });
  
  return Band;
};