"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PassengerCarCompanies extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Trip, Vehicle }) {
      // define association here
      this.belongsTo(Trip, { foreignKey: "tripId" });

      this.hasMany(Vehicle, {
        foreignKey: "passengerCarCompanyId",
        onDelete: "CASCADE",
      });
    }
  }
  PassengerCarCompanies.init(
    {
      name: DataTypes.STRING,
      image: DataTypes.STRING,
      description: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "PassengerCarCompanies",
    }
  );
  return PassengerCarCompanies;
};
