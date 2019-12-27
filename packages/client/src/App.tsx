import React from "react";
import logo from "./logo.svg";
import "./App.css";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import FruitList from "./fruits/FruitList";

const client = new ApolloClient({
  uri: "http://localhost:4000"
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <div className="app">
        <FruitList />
        {/* <header>Place MyAvatar here</header>
        <main>
          <div className="main-grid">
            <div>Place UserList here</div>
            <div>Place MessageList here</div>
          </div>
          <div className="form-container">Place MessageForm here</div>
        </main> */}
      </div>
    </ApolloProvider>
  );
};

export default App;
