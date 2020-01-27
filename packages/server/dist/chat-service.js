"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var v1_1 = __importDefault(require("uuid/v1"));
var ChatService = (function () {
    function ChatService() {
        this.messages = [
            { id: v1_1.default(), text: "Is anybody out there?", creationDate: new Date() },
            { id: v1_1.default(), text: "Nah", creationDate: new Date() }
        ];
        this.users = [{ id: v1_1.default(), name: "A wierd grill" }];
    }
    ChatService.prototype.addMessage = function (_a) {
        var senderId = _a.senderId, text = _a.text;
        var message = { id: v1_1.default(), senderId: senderId, text: text, creationDate: new Date() };
        this.messages.push(message);
        return message;
    };
    ChatService.prototype.getAllMessages = function () {
        return this.messages;
    };
    ChatService.prototype.addUser = function (_a) {
        var name = _a.name;
        if (this.users.some(function (x) { return x.name === name; })) {
            return;
        }
        var user = { id: v1_1.default(), name: name };
        this.users.push(user);
        return user;
    };
    ChatService.prototype.getAllUsers = function () {
        return this.users;
    };
    return ChatService;
}());
exports.ChatService = ChatService;
