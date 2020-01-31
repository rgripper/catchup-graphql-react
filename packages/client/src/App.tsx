import React, { useState, useEffect } from "react";
import "./App.css";
import { ApolloClient } from "apollo-client";
import { ApolloProvider } from "@apollo/react-hooks";
import FruitList from "./fruits/FruitList";
import FruitForm from "./fruits/FruitForm";
import UserList from "./chat/UserList";
import MessageList from "./chat/MessageList";
import Login from "./chat/Login";
import { WebSocketLink } from "apollo-link-ws";
import { getMainDefinition } from "apollo-utilities";
import { HttpLink } from "apollo-link-http";
import { split } from "apollo-link";
import { InMemoryCache } from "apollo-cache-inmemory";

function createLink(httpUrl: string, wsUrl: string) {
  const httpLink = new HttpLink({
    uri: httpUrl
  });

  const wsLink = new WebSocketLink({
    uri: wsUrl,
    options: {
      reconnect: true
    }
  });

  return split(
    // split based on operation type
    ({ query }) => {
      const definition = getMainDefinition(query);
      return definition.kind === "OperationDefinition" && definition.operation === "subscription";
    },
    wsLink as any,
    httpLink
  );
}

const client = new ApolloClient({
  link: createLink("http://localhost:4000", "ws://localhost:4000/graphql"),
  cache: new InMemoryCache()
});

function Chat({ user }) {
  return (
    <>
      <header className={"my-profile"}>
        <img src={user.avatarUrl} alt="My avatar" />
        {user.name}
      </header>
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
    </>
  );
}

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      const userJson = localStorage.getItem("user");
      if (userJson) {
        setUser(JSON.parse(userJson));
      }
    }
  }, [user]);

  return (
    <ApolloProvider client={client}>
      <div className="app">
        {/* <FruitList />
        <FruitForm /> */}
        {user ? <Chat user={user} /> : <Login onSuccess={setUser} />}
      </div>
    </ApolloProvider>
  );
};

export default App;
