import React from "react";
import "./App.css";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import FruitList from "./fruits/FruitList";
import FruitForm from "./fruits/FruitForm";
import UserList from "./chat/UserList";
import MessageList from "./chat/MessageList";

const client = new ApolloClient({
  uri: "http://localhost:4000"
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <div className="app">
        {/* <FruitList />
        <FruitForm /> */}
        <header>Place MyAvatar here</header>
        <main>
          <div className="main-grid">
            <div>
              <UserList />
            </div>
            <div>
              <MessageList />
            </div>
          </div>
          <div className="form-container">Place MessageForm here</div>
        </main>
      </div>
    </ApolloProvider>
  );
};

export default App;
