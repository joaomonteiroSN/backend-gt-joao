const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./src/docs/swagger.yaml');



const app = express();
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Importar os models centralizados
const db = require('./models');

// Rotas
const userRoutes = require('./routes/userRoutes');
app.use(userRoutes);

const categoryRoutes = require('./routes/categoryRoutes');
app.use(categoryRoutes);

const productRoutes = require('./routes/productRoutes');
app.use(productRoutes);

// Sincronizar banco de dados
db.sequelize.sync({ force: true }).then(() => {
    console.log('Tabelas criadas com sucesso!');
    app.listen(3000, () => console.log('Servidor rodando na porta 3000'));
}).catch(err => {
    console.error('Erro ao sincronizar com o banco de dados:', err);
});
