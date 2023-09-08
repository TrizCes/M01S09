/*
Defina um tipo "User" com campos como "id", "name", "age" e "profession". 
Implemente um resolver para a consulta "getUser" que retorna um usuário 
fictício com informações completas. 
Use o GraphiQL para testar a consulta e ver os detalhes do usuário.
*/

const { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList } = require('graphql');

const users = [
  { id: 1, name: 'Nini Ceschini', age: 18, profession: 'Professora' },
  { id: 2, name: 'Merida', age: 18, profession: 'Arqueira' },
  { id: 3, name: 'Aurora', age: 18, profession: 'Administradora' },
  { id: 4, name: 'Belle', age: 20, profession: 'Bibliotecaria' },
];

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    profession: { type: GraphQLString },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    User: {
      type: UserType,
      description: 'User description',
      args: { id: { type: GraphQLInt } },
      resolve: (parent, args) => users.find((user) => user.id === args.id),
    },
    Users: {
      type: new GraphQLList(UserType),
      description: 'Users list',
      resolve: () => users,
    },
  },
});

const schema = new GraphQLSchema({
  query: RootQuery,
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
