"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Stages extends Model {
    static associate({ Event, StageEvent }) {
      Stages.belongsToMany(Event, {
        foreignKey: "stages_id",
        as: "events",
        through: StageEvent,
      });
    }

    static associate(models) {}
  }

  Stages.init(
    {
      stages_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      stage_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Stages",
      tableName: "stages",
      timestamps: false,
    }
  );

  return Stages;
};