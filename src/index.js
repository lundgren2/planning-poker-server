import http from 'http';
import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import cors from 'cors';
import path from 'path';
import mongoose from 'mongoose';
import { fileLoader, mergeTypes, mergeResolvers } from 'merge-graphql-schemas';
import typeDefs from './graphql/schema';
import context from './graphql/context';
import { MONGODB_URI, PORT } from './config';

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
  subscriptions: {
    onConnect: () => console.log('Connected to websocket'),
  },
});

// Apply apollo server middleware
const app = express();
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json'
  );
  next();
});

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
