import { gql } from 'apollo-server-express';

const typeDefs = gql`
  type Query {
    hello: String
    stories: [Story!]!
    story(id: ID!): Story
    user(id: ID!): User
    users: [User!]!
  }

  type Mutation {
    signup(email: String!, password: String!, name: String!): AuthPayload!
    login(email: String!, password: String!): AuthPayload!
    createStory(title: String!, description: String): Story!
    deleteStory(id: ID!): Story
  }

  type Subscription {
    storySubscription: Story
  }

  type AuthPayload {
    token: String!
    user: User
  }

  type User {
    id: ID!
    email: String!
    name: String!
    createdStories: [Story!]
  }

  type Story {
    id: ID!
    title: String!
    active: Boolean
    description: String
    estimate: Float
    author: User
  }
`;
export default typeDefs;
