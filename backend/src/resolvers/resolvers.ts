import { ApolloServerExpressConfig } from 'apollo-server-express'

import { fixtures } from '../fixtures/fixtures'

const resolvers: ApolloServerExpressConfig['resolvers'] = {
  Query: {
    users: () => fixtures.users,
    forums: () => fixtures.forums,
    messages: (root, args) => {
      const { forumId } = args
      return fixtures.messages.filter(message => message.forumId === forumId)
    }
  },
  Mutation: {
    joinForum: (root, args) => {
      const { forumId } = args
      const forum = fixtures.forums.find(forum => forum.id === forumId)
      if (!forum) {
        throw new Error(`Forum with ID ${forumId} does not exist`)
      }

      forum.users.push(fixtures.users[0])

      return forum
    },
    createForum: (root, args) => {
      const { name } = args
      const newForum = {
        id: fixtures.forums.length + 1,
        name,
        users: [],
        messages: []
      }

      fixtures.forums.push(newForum)

      return newForum
    },
    postMessage: (root, args) => {
      const { forumId, text } = args
      const forum = fixtures.forums.find(forum => forum.id === forumId)
      if (!forum) {
        throw new Error(`Forum with ID ${forumId} does not exist`)
      }

      const newMessage = {
        id: fixtures.messages.length + 1,
        forumId,
        senderId: fixtures.users[0].id,
        text,
        createdAt: new Date().toISOString()
      }

      fixtures.messages.push(newMessage)

      return newMessage
    }
  }
}

export default resolvers
