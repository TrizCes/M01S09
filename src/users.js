/*
Defina um tipo "User" com campos como "id", "name", "age" e "profession". 
Implemente um resolver para a consulta "getUser" que retorna um usuário 
fictício com informações completas. 
Use o GraphiQL para testar a consulta e ver os detalhes do usuário.
*/

/*
Como parte do desenvolvimento da plataforma de redes sociais, 
você precisa permitir que os usuários obtenham informações detalhadas sobre um usuário específico.
Expanda a consulta "getUser" para aceitar um argumento "id". 
Implemente o resolver para buscar um usuário com o ID correspondente e retorne os campos "name",
"age" e "profession" desse usuário. 
Dessa forma, os usuários podem obter informações detalhadas sobre perfis específicos.
 */

const { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList, GraphQLNonNull } = require('graphql');

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

const UserOverviewType = new GraphQLObjectType({
  name: 'UserOverview',
  fields: () => ({
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    profession: { type: GraphQLString },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    getUser: {
      type: UserOverviewType,
      description: 'User description',
      args: { id: { type: new GraphQLNonNull(GraphQLInt) } },
      resolve: (parent, args) => {
        const user = users.find((user) => user.id === args.id);
        if (!user) {
          throw new Error(`User with ID ${args.id} not found`);
        }
        return {
          name: user.name,
          age: user.age,
          profession: user.profession,
        };
      },
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
