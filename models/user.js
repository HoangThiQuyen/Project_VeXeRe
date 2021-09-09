"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Ticket, Trip }) {
      // define association here
      this.hasMany(Ticket, { foreignKey: "userId", onDelete: "CASCADE" });
      this.belongsToMany(Trip, { through: Ticket });
    }
  }
  User.init(
    {
      name: DataTypes.STRING,
      numberPhone: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      avatar: DataTypes.STRING,
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
