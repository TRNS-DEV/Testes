const { DataTypes } = require('sequelize');
const sequelize = require('../database/db');

const HorarioColeta = sequelize.define('HorarioColeta', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  bairro: {
    type: DataTypes.STRING,
    allowNull: false
  },
  cidade: {
    type: DataTypes.STRING,
    defaultValue: 'Região Metropolitana do Recife'
  },
  dias_semana: {
    type: DataTypes.STRING,
    allowNull: false // Ex: "Segunda, Quarta e Sexta"
  },
  turno: {
    type: DataTypes.ENUM('manha', 'tarde', 'noite'),
    allowNull: false
  },
  tipo_residuo: {
    type: DataTypes.STRING,
    defaultValue: 'Domiciliar / Orgânico' // Pode ser entulho, reciclável, etc.
  }
});

module.exports = HorarioColeta;