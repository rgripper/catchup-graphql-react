"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
var apollo_server_1 = require("apollo-server");
var chat_service_1 = require("./chat-service");
var typeDefs = apollo_server_1.gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  type Query {\n    users: [User!]!\n  }\n  type Mutation {\n    login(name: String!): User!\n  }\n  type Subscription {\n    addedUser: User!\n  }\n\n  type User {\n    id: ID!\n    name: String!\n    avatarUrl: String!\n  }\n\n"], ["\n  type Query {\n    users: [User!]!\n  }\n  type Mutation {\n    login(name: String!): User!\n  }\n  type Subscription {\n    addedUser: User!\n  }\n\n  type User {\n    id: ID!\n    name: String!\n    avatarUrl: String!\n  }\n\n"])));
var pubSub = new apollo_server_1.PubSub();
var resolvers = {
    Query: {
        users: function (parent, args, context) { return context.chatService.getAllUsers(); }
    },
    Mutation: {
        login: function (parent, args, context) {
            var addedUser = context.chatService.addUser({ name: args.name });
            console.log("user!", addedUser);
            if (addedUser) {
                pubSub.publish("addedUser", { addedUser: addedUser });
            }
            return addedUser;
        },
    },
    User: {
        avatarUrl: function (user) {
            return "https://robohash.org/" + user.name + ".png";
        }
    },
    Subscription: {
        addedUser: {
            subscribe: function () { return pubSub.asyncIterator("addedUser"); }
        },
    }
};
var server = new apollo_server_1.ApolloServer({
    typeDefs: typeDefs,
    resolvers: resolvers,
    context: { chatService: new chat_service_1.ChatService() },
    cors: true
});
server.listen().then(function (_a) {
    var url = _a.url;
    console.log("\uD83D\uDE80  Server ready at " + url);
});
var templateObject_1;
