'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transacoes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Transacoes.init({
    TIPO: DataTypes.STRING,
    DATA: DataTypes.STRING,
    PARCELA: DataTypes.STRING,
    DESCRICAO: DataTypes.STRING,
    VALOR: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Transacoes',
  });
  return Transacoes;
};