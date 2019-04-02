import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import resolvers from './graphql/resolvers'
import typeDefs from './graphql/typeDefs'

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

// Apply apollo server middleware
const app = express()
server.applyMiddleware({ app })

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
)
