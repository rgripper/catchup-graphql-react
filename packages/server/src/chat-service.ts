import uuid from "uuid/v1";

export class ChatService {
  messages = [
    { id: uuid(), text: "Is anybody out there?", creationDate: new Date() },
    { id: uuid(), text: "Nah", creationDate: new Date() }
  ];
  users = [{ id: uuid(), name: "A wierd grill" }];

  addMessage({ senderId, text }) {
    const newMessage = { id: uuid(), senderId, text, creationDate: new Date() };
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

    const newUser = { id: uuid(), name };
    this.users.push(newUser);
    return newUser;
  }

  getAllUsers() {
    return this.users;
  }
}
