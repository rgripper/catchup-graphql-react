"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
var apollo_server_1 = require("apollo-server");
var chat_service_1 = require("./chat-service");
var typeDefs = apollo_server_1.gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  type Query {\n    fruits: [Fruit!]!\n  }\n\n  type Fruit {\n    id: ID!\n    name: String!\n  }\n"], ["\n  type Query {\n    fruits: [Fruit!]!\n  }\n\n  type Fruit {\n    id: ID!\n    name: String!\n  }\n"])));
var pubSub = new apollo_server_1.PubSub();
var resolvers = {
    Query: {}
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
