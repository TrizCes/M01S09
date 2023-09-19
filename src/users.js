const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLScalarType,
  GraphQLDirective,
  DirectiveLocation,
  GraphQLBoolean,
} = require('graphql');

const users = [
  { id: 1, name: 'Nini Ceschini', age: 18, profession: 'Professora', email: 'nini@email.com' },
  { id: 2, name: 'Merida', age: 18, profession: 'Arqueira', email: 'merida@email.com' },
  { id: 3, name: 'Aurora', age: 18, profession: 'Administradora', email: 'aurora@email.com' },
  { id: 4, name: 'Belle', age: 20, profession: 'Bibliotecaria', email: 'belle@email.com' },
];

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

const EmailDirective = new GraphQLDirective({
  name: 'email',
  description: 'Validate email.',
  locations: [DirectiveLocation.FIELD_DEFINITION],
});

const EmailScalarType = new GraphQLScalarType({
  name: 'Email',
  description: 'A custom scalar type for email addresses.',
  serialize: (value) => {
    if (!isValidEmail(value)) {
      throw new Error(`Invalid email address: ${value}`);
    }
    return value;
  },
  parseValue: (value) => {
    if (!isValidEmail(value)) {
      throw new Error(`Invalid email address: ${value}`);
    }
    return value;
  },
  parseLiteral: (ast) => {
    if (!isValidEmail(ast.value)) {
      throw new Error(`Invalid email address: ${ast.value}`);
    }
    return ast.value;
  },
});

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    profession: { type: GraphQLString },
    email: {
      type: EmailScalarType,
      description: "The user's email address.",
    },
  },
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    getUser: {
      type: UserType,
      description: 'Get user by ID',
      args: { id: { type: new GraphQLNonNull(GraphQLInt) } },
      resolve: (parent, args) => {
        const user = users.find((user) => user.id === args.id);
        if (!user) {
          throw new Error(`User with ID ${args.id} not found`);
        }
        return user;
      },
    },
    Users: {
      type: new GraphQLList(UserType),
      description: 'List of users',
      resolve: () => users,
    },
  },
});

const schema = new GraphQLSchema({
  query: RootQuery,
  directives: [EmailDirective],
});

module.exports = schema;
