import express from 'express'
import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4'
import cors from 'cors'
import sequelizeConnection from './db/connection'
import logger from './utils/logger'

const books = [
  {
    title: 'The Awakening',
    author: 'Kate Chopin',
  },
  {
    title: 'City of Glass',
    author: 'Paul Auster',
  },
]

const resolvers = {
  Query: {
    books: () => books,
  },
}

const typeDefs = `
  type Book {
    title: String!
    author: String!
  }
  type Query {
    books: [Book]
  }
`

async function startServer() {
  const app = express()

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  })

  await server.start()

  app.use(cors())

  app.use(express.json())

  app.use('/graphql', expressMiddleware(server))

  await (async function connectDatabase() {
    try {
      await sequelizeConnection.sync()
      logger.info('DB connected')
      app.listen(8000, () => {
        logger.info(`Server started at PORT 8000`)
      })
    } catch (error) {
      logger.error('Failed to connect database')
    }
  })()
}

startServer()
