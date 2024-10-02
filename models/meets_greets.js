"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class meets_greets extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  meets_greets.init(
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
      modelName: "meets_greets",
      tableName: "meets_greets",
      timestamps: false,
    }
  );
  return meets_greets;
};