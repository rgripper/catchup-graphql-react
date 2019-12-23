"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
var fruit_service_1 = require("./fruit-service");
var apollo_server_1 = require("apollo-server");
var typeDefs = apollo_server_1.gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  type Fruit {\n    name: String\n  }\n\n  type Query {\n    fruits: [Fruit]\n  }\n"], ["\n  type Fruit {\n    name: String\n  }\n\n  type Query {\n    fruits: [Fruit]\n  }\n"])));
var resolvers = {
    Query: {
        fruits: function (parent, args, context) { return context.fruitService.getAll(); }
    }
};
var server = new apollo_server_1.ApolloServer({ typeDefs: typeDefs, resolvers: resolvers, context: { fruitService: new fruit_service_1.FruitService() } });
server.listen().then(function (_a) {
    var url = _a.url;
    console.log("\uD83D\uDE80  Server ready at " + url);
});
var templateObject_1;
