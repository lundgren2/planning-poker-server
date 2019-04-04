import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { ApolloServer, PubSub } from 'apollo-server-express';
import http from 'http';
import resolvers from './graphql/resolvers';
import typeDefs from './graphql/schema';
import context from './graphql/context';
import { MONGODB_URI, PORT } from './config';

// Connect to MongoDB
mongoose.set('useCreateIndex', true);
mongoose.connect(MONGODB_URI, { useNewUrlParser: true }).catch(err => {
  console.log(err.message);
});

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context,
  introspection: true,
  playground: true,
});

// Apply apollo server middleware
const app = express();
app.use(cors());
server.applyMiddleware({ app });

const httpServer = http.createServer(app);

httpServer.listen({ port: PORT }, () => {
  console.log(
    `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
  );
  console.log(
    `🚀 Subscriptions ready at ws://localhost:${PORT}${
      server.subscriptionsPath
    }`
  );
});
