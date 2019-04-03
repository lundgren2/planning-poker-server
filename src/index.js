import express from 'express';
import cors from 'cors';
import { ApolloServer } from 'apollo-server-express';
import resolvers from './graphql/resolvers';
import typeDefs from './graphql/typeDefs';
import { PORT } from './config';

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Apply apollo server middleware
const app = express();
app.use(cors());
server.applyMiddleware({ app });

app.listen({ port: PORT }, () =>
  console.log(
    `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
  )
);
