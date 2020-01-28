import React, { useState } from "react";
import "./App.css";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import FruitList from "./fruits/FruitList";
import FruitForm from "./fruits/FruitForm";
import UserList from "./chat/UserList";
import MessageList from "./chat/MessageList";
import Login from "./chat/Login";

const client = new ApolloClient({
  uri: "http://localhost:4000"
});

function Chat({ user }) {
  return (
    <>
      <header className={"my-profile"}>
        <img src={user.avatarUrl} />
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
  console.log("so here it is", user);
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
