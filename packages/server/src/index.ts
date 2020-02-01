import { ApolloServer, gql, PubSub } from "apollo-server";
import { ChatService } from "./chat-service";

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  type Query {
    fruits: [Fruit!]!
  }

  type Fruit {
    id: ID!
    name: String!
  }
`;

const pubSub = new PubSub();

const resolvers = {
  Query: {
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: { chatService: new ChatService() },
  cors: true
});

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
