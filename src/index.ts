import express from 'express'
import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4'
import cors from 'cors'
import logger from './utils/logger'
import { connectDB, sequelize } from './db'
import { config } from './config'

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

  app.use('/v1/graphql', expressMiddleware(server))

  async function connectDatabase() {
    try {
      await connectDB()
      await sequelize.sync({ force: false })
      app.listen(config.app.PORT, () => {
        logger.info(`✅ Server started at PORT ${config.app.PORT}`)
      })
    } catch (error) {
      logger.error('Failed to connect database')
    }
  }

  await connectDatabase()
}

init()
