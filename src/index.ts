import { ApolloServer, gql } from 'apollo-server'
import Products, { IProducts } from './datasources/Products'

import { db } from './db'

const typeDefs = gql`
  type Products {
    id: Int
    name: String
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  type Query {
    products: [Products]
  }
`
interface IDataSources {
  products: IProducts
}

interface IContext {
  dataSources: IDataSources
}

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    products: (parent, args, context: IContext, info) =>
      context.dataSources.products.findAll()
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    products: new Products({ store: db })
  })
})

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
})
