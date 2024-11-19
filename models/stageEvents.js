"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class stage_events extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      stage_events.belongsTo(models.stages, {
        foreignKey: 'stage_id',
        as: 'stage'
      });
    
      stage_events.belongsTo(models.events, {
        foreignKey: 'event_id',
        as: 'event'
      });
    }
  }
  stage_events.init(
    {
      stage_event_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      stage_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      event_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "stage_events",
      tableName: "stage_events",
      timestamps: false,
    }
  );
  return stage_events;
};