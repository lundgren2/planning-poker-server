import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { ApolloServer } from 'apollo-server-express';
import resolvers from './graphql/resolvers';
import typeDefs from './graphql/typeDefs';
import { MONGODB_URI, PORT } from './config';

// Connect to MongoDB
mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    /* console.log('Connected to mongoDB') */
  })
  .catch(err => {
    console.log(err.message);
  });

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
