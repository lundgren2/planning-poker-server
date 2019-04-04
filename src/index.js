import http from 'http';
import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import cors from 'cors';
import path from 'path';
import mongoose from 'mongoose';
import { fileLoader, mergeTypes, mergeResolvers } from 'merge-graphql-schemas';
import typeDefs from './graphql/schema';
import context from './graphql/context';
import { MONGODB_URI } from './config';

const resolvers = mergeResolvers(
  fileLoader(path.join(__dirname, './graphql/resolvers'))
);

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
  subscriptions: {
    onConnect: () => console.log('Connected to websocket'),
  },
});

// Apply apollo server middleware
const app = express();
app.use(cors());
server.applyMiddleware({ app });

const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);

httpServer.listen({ port: process.env.PORT || 4000 }, () => {
  console.log(
    `🚀 Server ready at http://localhost:${process.env.PORT}${
      server.graphqlPath
    }`
  );
  console.log(
    `🚀 Subscriptions ready at ws://localhost:${process.env.PORT}${
      server.subscriptionsPath
    }`
  );
});
