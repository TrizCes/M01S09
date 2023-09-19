/*
Agora que os usuários podem explorar perfis e posts, 
você quer permitir que eles vejam todos os livros escritos por um autor. 
Crie um tipo "Author" com campos como "id" e "name". 
Além disso, defina um tipo "Book" com campos "id", "title" e "authorId". 
Implemente um resolver assíncrono para a consulta "getAuthorBooks" que, 
dado um ID de autor, retorna a lista de títulos de livros escritos por esse autor. 
Isso ajudará os usuários a explorar os escritores e seus trabalhos.
*/

const { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList, GraphQLNonNull } = require('graphql');
const { DATETIME } = require('mysql/lib/protocol/constants/types');

const Authors = [
  { id: 1, name: 'John' },
  { id: 2, name: 'Mike' },
  { id: 3, name: 'Daniel' },
  { id: 4, name: 'Richard' },
  { id: 5, name: 'George' },
];

const Books = [
  { id: 1, title: 'The Book', authorId: 1 },
  { id: 2, title: 'The second book', authorId: 2 },
  { id: 3, title: 'The third book', authorId: 3 },
  { id: 4, title: 'The fourth book', authorId: 4 },
  { id: 5, title: 'The fifth book', authorId: 5 },
];

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: {
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
  },
});

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: {
    id: { type: GraphQLInt },
    title: { type: GraphQLString },
    authorId: { type: GraphQLInt },
  },
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    getAuthorBooks: {
      type: new GraphQLList(BookType),
      description: 'Get books by authorID',
      args: { id: { type: new GraphQLNonNull(GraphQLInt) } },
      resolve: (parent, args) => {
        const books = [];
        Books.forEach((book) => {
          if (book.authorId === args.id) {
            books.push(book);
          }
        });
        if (books.length === 0) {
          throw new Error(`Books for the Author with ID ${args.id} not found`);
        }
        return books;
      },
    },
    getAllBooks: {
      type: new GraphQLList(BookType),
      description: 'Get books',
      resolve: (parent, args) => {
        if (!Books) {
          throw new Error(`Books not found`);
        }
        return Books;
      },
    },
  },
});

const schema = new GraphQLSchema({
  query: RootQuery,
});

module.exports = schema;
