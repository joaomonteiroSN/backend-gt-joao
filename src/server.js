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

// Rotas
const userRoutes = require('./routes/userRoutes');
app.use(userRoutes);

// Testar conexão e sincronizar - sempre que rodar a aplicação o db vai ser dropado e criado novamente - force:true 
sequelize.sync({ force: true }).then(() => {
    console.log('Tabelas criadas com sucesso!');
    app.listen(3000, () => console.log('Servidor rodando na porta 3000'));
}).catch(err => {
    console.error('Erro ao sincronizar com o banco de dados:', err);
});
