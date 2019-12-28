import { FruitService } from "./fruit-service";
import { ApolloServer, gql } from "apollo-server";

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  type Fruit {
    id: String!
    name: String!
  }

  type Query {
    fruits: [Fruit!]
  }

  type Mutation {
    addFruit(input: AddFruitInput!): Fruit!
  }

  input AddFruitInput {
    name: String!
  }
`;

const resolvers = {
  Query: {
    fruits: (parent, args, context) => context.fruitService.getAll()
  },
  Mutation: {
    addFruit: (parent, args, context) => context.fruitService.add(args.input)
  }
};

const server = new ApolloServer({ typeDefs, resolvers, context: { fruitService: new FruitService() } });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
