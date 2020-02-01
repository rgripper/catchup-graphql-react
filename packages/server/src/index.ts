import { ApolloServer, gql, PubSub } from "apollo-server";
import { ChatService } from "./chat-service";

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  type Query {
  }
  type Mutation {
    login(name: String!): User!
  }
  type Subscription {
    addedUser: User!
  }

  type User {
    id: ID!
    name: String!
    avatarUrl: String!
  }
`;

const pubSub = new PubSub();

const resolvers = {
  Query: {
  },
  Mutation: {
    login: (parent, args, context) => {
      const addedUser = context.chatService.addUser({ name: args.name });
      console.log("user!", addedUser);
      if (addedUser) {
        pubSub.publish("addedUser", { addedUser });
      }
      return addedUser;
    }
  },
  User: {
    avatarUrl(user) {
      return `https://robohash.org/${user.name}.png`;
    }
  },
  Subscription: {
    addedUser: {
      subscribe: () => pubSub.asyncIterator("addedUser")
    }
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
