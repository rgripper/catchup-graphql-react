import uuid from "uuid/v1";

export class ChatService {
  messages = [
    { id: uuid(), text: "Is anybody out there?", creationDate: new Date() },
    { id: uuid(), text: "Nah", creationDate: new Date() }
  ];
  users = [{ id: uuid(), name: "A wierd grill" }];

  addMessage({ senderId, text }) {
    const message = { id: uuid(), senderId, text, creationDate: new Date() };
    this.messages.push(message);
    return message;
  }

  getAllMessages() {
    return this.messages;
  }

  addUser({ name }) {
    if (this.users.some(x => x.name === name)) {
      return;
    }

    const user = { id: uuid(), name };
    this.users.push(user);
    return user;
  }

  getAllUsers() {
    return this.users;
  }
}
