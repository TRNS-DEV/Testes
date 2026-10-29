const { DataTypes } = require('sequelize');
const sequelize = require('../database/db');

const AvisoLimpeza = sequelize.define('AvisoLimpeza', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  titulo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  conteudo: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  bairro: {
    type: DataTypes.STRING,
    allowNull: true // null indica aviso geral para toda a Região Metropolitana
  },
  data_expiracao: {
    type: DataTypes.DATE,
    allowNull: true
  }
});

module.exports = AvisoLimpeza;