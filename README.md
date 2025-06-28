# Projeto Backend Geração Tech 2.0

Esse projeto é baseado nessa proposta:

https://github.com/digitalcollegebr/projeto-backend

Tentei seguir os principais requitos estabelecidos. 

## Tecnologias Utilizadas

- Node.js
- Express
- Nodemon
- dotenv
- Jsonwebtoken
- swagger
- mysql
- insomnia

## Utilização do projeto :computer:

Após o clone instale todos os pacotes utilizando:

    `npm install`

Para inicializar o projeto utilize o comando:

    `npm run dev`

Feito isso você poderá acessar a documentação do mesmo via: 

    http://localhosto:3000/api-docs

Na documentação é possível encontrar as principais rotas para as diferentes entidades, bem como os payloads para os testes no insomnia.


### Importante :warning:

- Algumas rotas necessitam de um tokem para serem testadas no insomnia. Para gerar esse token é necessário utilizar o comando:

        `node genToken.js` 

    Depois é só copiar e realizar os testes.

- Para a rota de criação de produtos e consequentemente a atualização é necessário utilizar uma url de imagem em base64 válida no payload, caso constrário um erro 400 surge.

- Como padrão foi estabelecido que a cada nova alteração no código a aplicação 'dropa' e cria um novo banco de dados, sendo assim é necessário sempre carregar seus dados.


Esse projeto foi feito com muito :yellow_heart: por mim, João Monteiro.