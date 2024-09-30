'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Jwt extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Jwt.init(
    {
      access_key: DataTypes.JSON,
      refresh_key: DataTypes.JSON
    },
    {
      sequelize,
      modelName: 'Jwt',
      underscored: true,
      freezeTableName: true,
      paranoid: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      deletedAt: 'deleted_at'
    }
  );
  return Jwt;
};
