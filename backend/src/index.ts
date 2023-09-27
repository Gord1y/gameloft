import { ApolloServer } from 'apollo-server-express'
import express from 'express'

import { fixtures } from './fixtures/fixtures'
import { createTypeDefs } from './intefaces/typeDefs'
import resolvers from './resolvers/resolvers'

const app = express()
const PORT = 4000

const server = new ApolloServer({
  typeDefs: createTypeDefs(),
  resolvers,
  context: { fixtures }
})

const startServer = async () => {
  await server.start()

  server.applyMiddleware({ app })

  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
  })
}

startServer().catch(error => {
  console.error('Error starting server:', error)
})
