const { DataTypes } = require('sequelize');
const sequelize = require('../database/db');
const Usuario = require('./usuario');

const Denuncia = sequelize.define('Denuncia', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  tipo_residuo: {
    type: DataTypes.STRING,
    allowNull: false // Ex: "Entulho", "Lixo Eletrônico", "Pneus", "Lixo Doméstico"
  },
  descricao: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  bairro: {
    type: DataTypes.STRING,
    allowNull: false
  },
  endereco_referencia: {
    type: DataTypes.STRING,
    allowNull: true // Ex: "Em frente ao mercadinho do Zé"
  },
  latitude: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  longitude: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  status: {
    type: DataTypes.ENUM('Pendente', 'Em Andamento', 'Resolvido', 'Cancelado'),
    defaultValue: 'Pendente'
  }
});

// Relacionamento: Um Usuário pode fazer várias Denúncias,
// mas cada Denúncia pertence a apenas um Usuário.
Denuncia.belongsTo(Usuario, {
  foreignKey: {
    name: 'usuario_id',
    allowNull: false
  },
  onDelete: 'CASCADE'
});

Usuario.hasMany(Denuncia, {
  foreignKey: 'usuario_id'
});

module.exports = Denuncia;