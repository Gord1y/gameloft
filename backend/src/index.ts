import { ApolloServer, gql } from 'apollo-server-express'
import express from 'express'

const app = express()
const port = process.env.PORT || 4000

const typeDefs = gql`
  type Query {
    hello: String
  }
`

const resolvers = {
  Query: {
    hello: () => 'Hello, World!'
  }
}

async function startServer() {
  const server = new ApolloServer({ typeDefs, resolvers })

  await server.start()

  server.applyMiddleware({ app })

  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}/graphql`)
  })
}

startServer().catch(error => {
  console.error('Error starting the server:', error)
})
