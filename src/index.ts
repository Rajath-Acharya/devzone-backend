import express from 'express'
import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4'
import cors from 'cors'
import logger from './utils/logger'
import { config } from './config'
import 'reflect-metadata'
import { AppDataSource } from './data-source'

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

async function init() {
  const app = express()

  app.use(
    cors({
      origin: ['http://localhost:3000'],
      credentials: true,
    }),
  )

  app.use(express.json())

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  })

  await server.start()

  app.use('/graphql', expressMiddleware(server))

  async function connectDatabase() {
    try {
      await AppDataSource.initialize()
      logger.info('✅ Database connected')
      app.listen(config.app.port, () => {
        logger.info(`✅ Server started at PORT ${config.app.port}`)
      })
    } catch (error) {
      logger.error('Failed to connect database')
      process.exit(1)
    }
  }

  await connectDatabase()
}

init()
