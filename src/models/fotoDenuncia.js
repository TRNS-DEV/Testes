const { DataTypes } = require('sequelize');
const sequelize = require('../database/db');
const Denuncia = require('./denuncia');

const FotoDenuncia = sequelize.define('FotoDenuncia', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  caminho_arquivo: {
    type: DataTypes.STRING,
    allowNull: false // Guarda o caminho/nome da imagem (ex: "uploads/denuncia-102.jpg")
  }
});

// Relacionamento: Uma Denúncia pode ter VÁRIAS fotos,
// mas cada Foto pertence a APENAS UMA Denúncia específica.
FotoDenuncia.belongsTo(Denuncia, {
  foreignKey: {
    name: 'denuncia_id',
    allowNull: false
  },
  onDelete: 'CASCADE'
});

Denuncia.hasMany(FotoDenuncia, {
  foreignKey: 'denuncia_id'
});

module.exports = FotoDenuncia;