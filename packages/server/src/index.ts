import { FruitService } from "./fruit-service";
import { ApolloServer, gql, PubSub } from "apollo-server";
import { ChatService } from "./chat-service";
import { GraphQLScalarType, Kind } from "graphql";

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  type Query {
    fruits: [Fruit!]!
    messages: [Message!]!
    users: [User!]!
  }

  type Mutation {
    addFruit(input: AddFruitInput!): Fruit!
    login(name: String!): User!
    addMessage(senderId: ID, text: String!): Message!
  }

  type Subscription {
    addedMessage: Message!
    addedUser: User!
  }

  input AddFruitInput {
    name: String!
  }

  type Message {
    id: ID!
    senderId: ID
    creationDate: Date!
    text: String!
  }

  type User {
    id: ID!
    name: String!
    avatarUrl: String!
  }

  type Fruit {
    id: ID!
    name: String!
  }

  scalar Date
`;

const pubSub = new PubSub();

const dateType = new GraphQLScalarType({
  name: "Date",
  description: "Date",
  serialize(value: Date): number {
    return value.getTime();
  },
  parseValue(value: number): Date {
    return new Date(value);
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      return ast.value;
    }
    return null;
  }
});

const resolvers = {
  Query: {
    fruits: (parent, args, context) => context.fruitService.getAll(),
    messages: (parent, args, context) => context.chatService.getAllMessages(),
    users: (parent, args, context) => context.chatService.getAllUsers()
  },
  Mutation: {
    addFruit: (parent, args, context) => context.fruitService.add(args.input),
    login: (parent, args, context) => {
      const addedUser = context.chatService.addUser({ name: args.name });
      console.log("user!", addedUser);
      if (addedUser) {
        pubSub.publish("addedUser", { addedUser });
      }
      return addedUser;
    },
    addMessage: (parent, args, context) => {
      const addedMessage = context.chatService.addMessage({ senderId: args.senderId, text: args.text });
      if (addedMessage) {
        pubSub.publish("addedMessage", { addedMessage });
      }

      return addedMessage;
    }
  },
  User: {
    avatarUrl(user) {
      return `https://robohash.org/${user.name}.png`;
    }
  },
  Date: dateType,
  Subscription: {
    addedUser: {
      subscribe: () => pubSub.asyncIterator("addedUser")
    },
    addedMessage: {
      subscribe: () => pubSub.asyncIterator("addedMessage")
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: { fruitService: new FruitService(), chatService: new ChatService() },
  cors: true
});

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
