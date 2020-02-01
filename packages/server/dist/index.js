"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
const chat_service_1 = require("./chat-service");
const typeDefs = apollo_server_1.gql `
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
const pubSub = new apollo_server_1.PubSub();
const resolvers = {
    Query: {},
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
const server = new apollo_server_1.ApolloServer({
    typeDefs,
    resolvers,
    context: { chatService: new chat_service_1.ChatService() },
    cors: true
});
server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});
