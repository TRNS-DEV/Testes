const { DataTypes } = require('sequelize');
const sequelize = require('../database/db');

const Usuario = sequelize.define('Usuario', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  tipo_usuario: {
    type: DataTypes.ENUM('cidadao', 'empresa'),
    allowNull: false
  },
  // Dados Comuns de Autenticação
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: { isEmail: true }
  },
  senha_hash: {
    type: DataTypes.STRING,
    allowNull: false
  },
  
  // Campos do Cidadão
  nome_completo: {
    type: DataTypes.STRING,
    allowNull: true
  },
  telefone_cidadao: {
    type: DataTypes.STRING,
    allowNull: true
  },
  cep: {
    type: DataTypes.STRING,
    allowNull: true
  },
  bairro: {
    type: DataTypes.STRING,
    allowNull: true
  },

  // Campos da Empresa (Módulo B2B)
  razao_social: {
    type: DataTypes.STRING,
    allowNull: true
  },
  nome_fantasia: {
    type: DataTypes.STRING,
    allowNull: true
  },
  cnpj: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true
  },
  nome_responsavel: {
    type: DataTypes.STRING,
    allowNull: true
  },
  telefone_empresa: {
    type: DataTypes.STRING,
    allowNull: true
  },
  endereco_sede: {
    type: DataTypes.STRING,
    allowNull: true
  },
  areas_atendidas: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  email_verificado: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
});

module.exports = Usuario;