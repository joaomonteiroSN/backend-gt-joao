const express = require('express');
const sequelize = require('./config/database');
require('dotenv').config();

const app = express();
app.use(express.json());

// Importar os models
require('./models/User');
require('./models/Category');
require('./models/Product');
require('./models/ProductImage');
require('./models/ProductOption');
require('./models/ProductCategory');

// Testar conexão e sincronizar
sequelize.sync({ force: true }).then(() => {
    console.log('Tabelas criadas com sucesso!');
    app.listen(3000, () => console.log('Servidor rodando na porta 3000'));
}).catch(err => {
    console.error('Erro ao sincronizar com o banco de dados:', err);
});
