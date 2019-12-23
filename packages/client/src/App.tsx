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
      <div className="App">
        <header className="App-header">
          <img style={{ width: "10px", height: "10px" }} src={logo} className="App-logo" alt="logo" />
          <p>Christmas mode?</p>
          <FruitList />
        </header>
      </div>
    </ApolloProvider>
  );
};

export default App;
