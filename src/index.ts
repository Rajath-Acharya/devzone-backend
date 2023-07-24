import { buildSchema } from 'graphql'
import express from 'express'
import { graphqlHTTP } from 'express-graphql'

const PORT = 4000

const schema = buildSchema(`
  type Query {
    hello: String
  }
`)

const app = express()

const root = {
  hello: () => {
    return 'Hello world!'
  },
}

app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  }),
)

app.listen(PORT, () => {
  console.log(`Running a GraphQL API server at http://localhost:${PORT}/graphql`)
})
