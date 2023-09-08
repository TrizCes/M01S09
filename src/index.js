/*
Defina um tipo "User" com campos como "id", "name", "age" e "profession". 
Implemente um resolver para a consulta "getUser" que retorna um usuário 
fictício com informações completas. 
Use o GraphiQL para testar a consulta e ver os detalhes do usuário.
*/
const express = require("express");
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema');

const app = express();

app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);

app.get('/', (req, res) => res.send('GraphQl is running'));

app.listen(3000, () => console.log(`📡 Server running on port 3000 (●'◡'●)`));