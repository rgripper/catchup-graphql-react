import { FruitService } from "./fruit-service";
import { ApolloServer, gql } from "apollo-server";

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  type Fruit {
    name: String
  }

  type Query {
    fruits: [Fruit]
  }
`;

const resolvers = {
  Query: {
    fruits: (parent, args, context) => context.fruitService.getAll()
  }
};

const server = new ApolloServer({ typeDefs, resolvers, context: { fruitService: new FruitService() } });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
