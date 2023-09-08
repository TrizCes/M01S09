const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schemaUser = require('./usersSchema');
const schemaPost = require('./postSearch');
const app = express();

app.use(
  '/users', // Rota para pesquisa de usuarios
  graphqlHTTP({
    schema: schemaUser, // Esquema pesquisa de usuarios
    graphiql: true,
  })
);

app.use(
  '/postSearch', // Rota para pesquisa de postagens
  graphqlHTTP({
    schema: schemaPost, // Esquema para pesquisa de postagens
    graphiql: true,
  })
);

app.get('/', (req, res) => res.send('GraphQL is running'));

app.listen(3000, () => console.log(`📡 Server running on port 3000 (●'◡'●)`));
