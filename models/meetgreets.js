'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class MeetGreet extends Model {
    static associate(models) {
      // define association here
      MeetGreet.belongsTo(models.Event, { foreignKey: 'event_id' });
      MeetGreet.belongsTo(models.Band, { foreignKey: 'band_id' });
    }
  }
  MeetGreet.init({
    meet_greet_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    event_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    band_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    meet_start: DataTypes.DATE,
    meet_end: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'MeetGreet',
    tableName: 'meets_greets',
    timestamps: false
  });
  return MeetGreet;
};