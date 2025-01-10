// Normatização do código
'use strict';

// Permissão para acessar o sistema de arquivos do PC
const fs = require('fs');

// Permissão para acessar o caminho do arquivo
const path = require('path');

// Sequelize é um ORM para Node.js
// ORM (Object-Relational Mapping) é uma técnica de mapeamento objeto-relacional que permite aos desenvolvedores web trabalhar com um banco de dados usando objetos
const Sequelize = require('sequelize');

// Process é um módulo global que fornece informações e controle sobre o processo na página atual
const process = require('process');

// Permite obter parte do caminho de um arquivo
const basename = path.basename(__filename);

// Verifica se deve usar o ambiente de desenvolvimento ou global
const env = process.env.NODE_ENV || 'development';

// Incluir o arquivo com as variáveis do ambiente
const config = require(__dirname + '/../config/config.js')[env];

// Define uma constante com objeto vazio
const db = {};

// Define a variável que recebe a conexão com o banco de dados
let sequelize;

// Verifica qual a configuração do banco de dados deve ser utilizada
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  // Utiliza as configurações do arquivo "config/config.js"
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// Verificar a conexão com o banco de dados
sequelize.authenticate().then(() => {
  console.log('Conexão com o banco de dados estabelecida com sucesso!!!');
}).catch(err => {
  console.error('Erro ao conectar com o banco de dados:', err);
});

// Identificar a MODEL
fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// Atribuir a conexão com o banco de dados para o objeto "db"
db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Exportar o objeto "db"
module.exports = db;
