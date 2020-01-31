"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
var fruit_service_1 = require("./fruit-service");
var apollo_server_1 = require("apollo-server");
var chat_service_1 = require("./chat-service");
var graphql_1 = require("graphql");
var typeDefs = apollo_server_1.gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  type Query {\n    fruits: [Fruit!]!\n    messages: [Message!]!\n    users: [User!]!\n  }\n\n  type Mutation {\n    addFruit(input: AddFruitInput!): Fruit!\n    login(name: String!): User!\n    addMessage(senderId: ID, text: String!): Message!\n  }\n\n  type Subscription {\n    addedMessage: Message!\n    addedUser: User!\n  }\n\n  input AddFruitInput {\n    name: String!\n  }\n\n  type Message {\n    id: ID!\n    senderId: ID\n    creationDate: Date!\n    text: String!\n  }\n\n  type User {\n    id: ID!\n    name: String!\n    avatarUrl: String!\n  }\n\n  type Fruit {\n    id: ID!\n    name: String!\n  }\n\n  scalar Date\n"], ["\n  type Query {\n    fruits: [Fruit!]!\n    messages: [Message!]!\n    users: [User!]!\n  }\n\n  type Mutation {\n    addFruit(input: AddFruitInput!): Fruit!\n    login(name: String!): User!\n    addMessage(senderId: ID, text: String!): Message!\n  }\n\n  type Subscription {\n    addedMessage: Message!\n    addedUser: User!\n  }\n\n  input AddFruitInput {\n    name: String!\n  }\n\n  type Message {\n    id: ID!\n    senderId: ID\n    creationDate: Date!\n    text: String!\n  }\n\n  type User {\n    id: ID!\n    name: String!\n    avatarUrl: String!\n  }\n\n  type Fruit {\n    id: ID!\n    name: String!\n  }\n\n  scalar Date\n"])));
var pubSub = new apollo_server_1.PubSub();
var dateType = new graphql_1.GraphQLScalarType({
    name: "Date",
    description: "Date",
    serialize: function (value) {
        return value.getTime();
    },
    parseValue: function (value) {
        return new Date(value);
    },
    parseLiteral: function (ast) {
        if (ast.kind === graphql_1.Kind.INT) {
            return ast.value;
        }
        return null;
    }
});
var resolvers = {
    Query: {
        fruits: function (parent, args, context) { return context.fruitService.getAll(); },
        messages: function (parent, args, context) { return context.chatService.getAllMessages(); },
        users: function (parent, args, context) { return context.chatService.getAllUsers(); }
    },
    Mutation: {
        addFruit: function (parent, args, context) { return context.fruitService.add(args.input); },
        login: function (parent, args, context) {
            var addedUser = context.chatService.addUser({ name: args.name });
            console.log("user!", addedUser);
            if (addedUser) {
                pubSub.publish("addedUser", { addedUser: addedUser });
            }
            return addedUser;
        },
        addMessage: function (parent, args, context) {
            var addedMessage = context.chatService.addMessage({ senderId: args.senderId, text: args.text });
            if (addedMessage) {
                pubSub.publish("addedMessage", { addedMessage: addedMessage });
            }
        }
    },
    User: {
        avatarUrl: function (user) {
            return "https://robohash.org/" + user.name + ".png";
        }
    },
    Date: dateType,
    Subscription: {
        addedUser: {
            subscribe: function () { return pubSub.asyncIterator("addedUser"); }
        },
        addedMessage: {
            subscribe: function () { return pubSub.asyncIterator("addedMessage"); }
        }
    }
};
var server = new apollo_server_1.ApolloServer({
    typeDefs: typeDefs,
    resolvers: resolvers,
    context: { fruitService: new fruit_service_1.FruitService(), chatService: new chat_service_1.ChatService() },
    cors: true
});
server.listen().then(function (_a) {
    var url = _a.url;
    console.log("\uD83D\uDE80  Server ready at " + url);
});
var templateObject_1;
