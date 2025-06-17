require('dotenv').config();
const jwt = require('jsonwebtoken');

// Altere esse ID para o ID de um usuário real do banco
const userId = 1;

// Cria o token
const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
  expiresIn: '1d' // expira em 1 dia
});

console.log('TOKEN JWT GERADO:\n');
console.log(token);
