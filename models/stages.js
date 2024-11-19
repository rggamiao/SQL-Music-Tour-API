"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class MeetsGreets extends Model {
    static associate(models) {
      MeetsGreets.belongsTo(models.events, {
        foreignKey: 'event_id',
        as: 'event'
      });

      MeetsGreets.belongsTo(models.bands, {
        foreignKey: 'band_id',
        as: 'band'
      });
    }
  }

  MeetsGreets.init(
    {
      meet_greet_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      event_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      band_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      meet_start: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      meet_end: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "MeetsGreets",
      tableName: "meets_greets",
      timestamps: false,
    }
  );

  return MeetsGreets;
};