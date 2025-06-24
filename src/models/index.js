const fs = require('fs');
const path = require('path');
const sequelize = require('../config/database'); // ✅ usa a instância pronta
const Sequelize = require('sequelize');

const db = {};

// Lê todos os arquivos da pasta models, exceto o próprio index.js
fs.readdirSync(__dirname)
  .filter(file => file !== 'index.js' && file.endsWith('.js'))
  .forEach(file => {
    const modelPath = path.join(__dirname, file);
    const model = require(modelPath);

    if (typeof model.init === 'function') {
      const initializedModel = model.init(sequelize);
      db[initializedModel.name] = initializedModel;
    }
  });

// Associa os modelos entre si, se tiverem método associate
Object.values(db).forEach(model => {
  if (typeof model.associate === 'function') {
    model.associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
