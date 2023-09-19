/*Agora que seu servidor está rodando, você precisa permitir que os usuários 
obtenham informações sobre os posts na plataforma. 
Crie um tipo "Post" com campos como "id", "title", "content" e "publishDate".
Escreva uma consulta chamada "getAllPosts" que retorna uma lista de posts, 
contendo apenas os campos "title" e "publishDate" para cada post. 
Isso permitirá que os usuários vejam uma lista resumida dos posts disponíveis.
*/
const { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList } = require('graphql');
const { DATETIME } = require('mysql/lib/protocol/constants/types');

const posts = [
  {
    id: 1,
    title: 'Códigos em JS',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur sit amet efficitur diam, sit amet condimentum tellus. Morbi ut eros magna. Suspendisse felis lectus, commodo at laoreet in, pellentesque molestie purus. Etiam at vestibulum nulla. Integer tellus velit, egestas eget mi eu, finibus suscipit magna. Pellentesque blandit porttitor nunc ac tempor. Aenean laoreet ex sit amet dolor vestibulum viverra. Curabitur fringilla justo ac dictum fringilla.\n Nulla ut consectetur justo. Mauris sodales gravida lacus ac varius. Fusce vitae augue ut turpis laoreet laoreet. Morbi eget nisl luctus, tristique diam nec, fringilla nisi. Mauris in nibh mattis, posuere urna venenatis, molestie ante. Etiam sodales nisi vitae pulvinar feugiat. Nulla porta malesuada eros, id pretium nulla elementum et. Aenean semper mauris nibh. Phasellus efficitur, leo quis volutpat lacinia, nisl turpis tincidunt magna, in pellentesque urna mauris ut magna.',
    publishDate: new Date(2000, 1, 1),
  },
  {
    id: 2,
    title: 'O melhor CSS já criado',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur sit amet efficitur diam, sit amet condimentum tellus. Morbi ut eros magna. Suspendisse felis lectus, commodo at laoreet in, pellentesque molestie purus. Etiam at vestibulum nulla. Integer tellus velit, egestas eget mi eu, finibus suscipit magna. Pellentesque blandit porttitor nunc ac tempor. Aenean laoreet ex sit amet dolor vestibulum viverra. Curabitur fringilla justo ac dictum fringilla.\n Nulla ut consectetur justo. Mauris sodales gravida lacus ac varius. Fusce vitae augue ut turpis laoreet laoreet. Morbi eget nisl luctus, tristique diam nec, fringilla nisi. Mauris in nibh mattis, posuere urna venenatis, molestie ante. Etiam sodales nisi vitae pulvinar feugiat. Nulla porta malesuada eros, id pretium nulla elementum et. Aenean semper mauris nibh. Phasellus efficitur, leo quis volutpat lacinia, nisl turpis tincidunt magna, in pellentesque urna mauris ut magna.',
    publishDate: new Date(2023, 5, 1),
  },
  {
    id: 3,
    title: 'Tudo que você precisa saber sobre JS',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur sit amet efficitur diam, sit amet condimentum tellus. Morbi ut eros magna. Suspendisse felis lectus, commodo at laoreet in, pellentesque molestie purus. Etiam at vestibulum nulla. Integer tellus velit, egestas eget mi eu, finibus suscipit magna. Pellentesque blandit porttitor nunc ac tempor. Aenean laoreet ex sit amet dolor vestibulum viverra. Curabitur fringilla justo ac dictum fringilla.\n Nulla ut consectetur justo. Mauris sodales gravida lacus ac varius. Fusce vitae augue ut turpis laoreet laoreet. Morbi eget nisl luctus, tristique diam nec, fringilla nisi. Mauris in nibh mattis, posuere urna venenatis, molestie ante. Etiam sodales nisi vitae pulvinar feugiat. Nulla porta malesuada eros, id pretium nulla elementum et. Aenean semper mauris nibh. Phasellus efficitur, leo quis volutpat lacinia, nisl turpis tincidunt magna, in pellentesque urna mauris ut magna.',
    publishDate: new Date(2023, 6, 3),
  },
  {
    id: 4,
    title: 'C# para seguir',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur sit amet efficitur diam, sit amet condimentum tellus. Morbi ut eros magna. Suspendisse felis lectus, commodo at laoreet in, pellentesque molestie purus. Etiam at vestibulum nulla. Integer tellus velit, egestas eget mi eu, finibus suscipit magna. Pellentesque blandit porttitor nunc ac tempor. Aenean laoreet ex sit amet dolor vestibulum viverra. Curabitur fringilla justo ac dictum fringilla.\n Nulla ut consectetur justo. Mauris sodales gravida lacus ac varius. Fusce vitae augue ut turpis laoreet laoreet. Morbi eget nisl luctus, tristique diam nec, fringilla nisi. Mauris in nibh mattis, posuere urna venenatis, molestie ante. Etiam sodales nisi vitae pulvinar feugiat. Nulla porta malesuada eros, id pretium nulla elementum et. Aenean semper mauris nibh. Phasellus efficitur, leo quis volutpat lacinia, nisl turpis tincidunt magna, in pellentesque urna mauris ut magna.',
    publishDate: new Date(2023, 6, 4),
  },
];

const PostType = new GraphQLObjectType({
  name: 'Post',
  fields: () => ({
    id: { type: GraphQLInt },
    title: { type: GraphQLString },
    content: { type: GraphQLString },
    publishDate: { type: GraphQLString },
  }),
});

const PostOverviewType = new GraphQLObjectType({
  name: 'PostOverview',
  fields: () => ({
    title: { type: GraphQLString },
    publishDate: { type: GraphQLString },
  }),
});

const PostAtualizeType = new GraphQLObjectType({
  name: 'PostAtualize',
  fields: () => ({
    id: { type: GraphQLInt },
    title: { type: GraphQLString },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    Post: {
      type: PostType,
      description: 'Post over view',
      args: { id: { type: GraphQLInt } },
      resolve: (parent, args) => posts.find((post) => post.id === args.id),
    },
    Posts: {
      type: new GraphQLList(PostType),
      description: 'Posts list',
      resolve: () => posts,
    },
    getAllPosts: {
      type: new GraphQLList(PostOverviewType),
      description: 'Posts list - little',
      resolve: () => {
        return posts.map((post) => ({
          title: post.title,
          publishDate: post.publishDate,
        }));
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    updatePostTitle: {
      type: PostAtualizeType,
      args: {
        id: { type: GraphQLInt },
        title: { type: GraphQLString },
      },
      resolve(parent, args) {
        let atualize = false;
        posts.find((post) => {
          if (post.id === args.id) {
            post.title = args.title;
            atualize = true;
          }
        });
        return atualize ? args : null;
      },
    },
  },
});

const schemaPost = new GraphQLSchema({
  query: RootQuery,
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
