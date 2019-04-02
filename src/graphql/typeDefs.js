import { gql } from 'apollo-server-express';

const typeDefs = gql`
  type Query {
    hello: String
    stories: [Story!]!
    story(id: ID!): Story
    me: User
    users: [User!]!
  }

  type Mutation {
    signup(email: String!, password: String!, name: String!): AuthPayload!
    login(email: String!, password: String!): AuthPayload!
    createStory(title: String, content: String): Story!
    deleteStory(id: ID!): Story!
  }

  type Subscription {
    storySubscription: Story
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type User {
    id: ID!
    email: String!
    name: String!
    stories: [Story!]!
  }

  type Story {
    id: ID!
    active: Boolean
    title: String!
    content: String
    estimate: Float
    author: User!
  }
`;
export default typeDefs;
