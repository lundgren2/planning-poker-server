import { gql } from 'apollo-server-express';

export default gql`
  type Query {
    hello: String
    stories: [Story!]!
    story(id: ID!): Story
    user(id: ID!): User
    users: [User!]!
    votes: [Vote!]
  }

  type Mutation {
    signup(email: String!, password: String!, name: String!): AuthPayload!
    login(email: String!, password: String!): AuthPayload!
    createStory(title: String!, description: String): Story!
    deleteStory(id: ID!): Story
    vote(storyId: ID!, value: Float): Story
  }

  type Subscription {
    storyUpdated: Story
    storyCreated: Story
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
    createdVotes: [Vote!]
  }

  type Story {
    id: ID!
    title: String!
    active: Boolean
    description: String
    estimate: Float
    author: User
    votes: [Vote]
    fake: [Int]
  }

  type Vote {
    storyId: String!
    user: User
    value: Float
  }
`;
