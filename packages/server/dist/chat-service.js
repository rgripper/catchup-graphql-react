"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const v1_1 = __importDefault(require("uuid/v1"));
class ChatService {
    constructor() {
        this.messages = [
            { id: v1_1.default(), text: "Is anybody out there?", creationDate: new Date() },
            { id: v1_1.default(), text: "Nah", creationDate: new Date() }
        ];
        this.users = [{ id: v1_1.default(), name: "A wierd grill" }];
    }
    addMessage({ senderId, text }) {
        const newMessage = { id: v1_1.default(), senderId, text, creationDate: new Date() };
        this.messages.push(newMessage);
        return newMessage;
    }
    getAllMessages() {
        return this.messages;
    }
    addUser({ name }) {
        const existingUser = this.users.find(x => x.name === name);
        if (existingUser) {
            return existingUser;
        }
        const newUser = { id: v1_1.default(), name };
        this.users.push(newUser);
        return newUser;
    }
    getAllUsers() {
        return this.users;
    }
}
exports.ChatService = ChatService;
