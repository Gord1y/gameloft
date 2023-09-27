import { gql } from 'apollo-server-express'

export const createTypeDefs = () => {
  return gql`
    type Query {
      users: [User!]!
      forums: [Forum!]!
      messages(forumId: Int!): [Message!]!
    }

    type Mutation {
      joinForum(forumId: Int!): Forum!
      createForum(name: String!): Forum!
      postMessage(forumId: Int!, text: String!): Message!
    }

    type User {
      id: Int!
      name: String!
      picture: String!
    }

    type Forum {
      id: Int!
      name: String!
      users: [User!]!
      messages: [Message!]!
    }

    type Message {
      id: Int!
      forumId: Int!
      senderId: Int!
      text: String!
      createdAt: String!
    }
  `
}
