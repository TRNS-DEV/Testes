const { DataTypes } = require('sequelize');
const sequelize = require('../database/db');
const Usuario = require('./usuario');

const SolicitacaoComercial = sequelize.define('SolicitacaoComercial', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  tipo_servico: {
    type: DataTypes.STRING,
    allowNull: false // Ex: "Coleta de Recicláveis em Grande Volume", "Entulho de Obra", "Plano Mensal ESG"
  },
  descricao_volume: {
    type: DataTypes.TEXT,
    allowNull: false // Ex: "Aproximadamente 300kg de papelão e plástico no galpão 2"
  },
  data_desejada: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  turno_desejado: {
    type: DataTypes.ENUM('manha', 'tarde', 'noite'),
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('Pendente', 'Aprovado', 'Em Rota', 'Concluído', 'Cancelado'),
    defaultValue: 'Pendente'
  }
});

// Relacionamento: Uma solicitação comercial é feita por uma Empresa (que é um Usuário)
SolicitacaoComercial.belongsTo(Usuario, {
  foreignKey: {
    name: 'empresa_id',
    allowNull: false
  },
  onDelete: 'CASCADE'
});

Usuario.hasMany(SolicitacaoComercial, {
  foreignKey: 'empresa_id'
});

module.exports = SolicitacaoComercial;