import { useQuery } from "@apollo/react-hooks";
import React, { useEffect } from "react";
import gql from "graphql-tag";
import Stub from "../Stub";

export const MESSAGES_QUERY = null;

export const ADDED_MESSAGE_SUBSCRIPTION = null;

function MessageList() {
  const { loading, error, data, subscribeToMore } = useQuery(MESSAGES_QUERY);
  // useEffect(
  //   () =>
  //     subscribeToMore({
  //       document: ADDED_MESSAGE_SUBSCRIPTION,
  //       updateQuery: (prev, { subscriptionData }) => {
  //         if (!subscriptionData.data.addedMessage) return prev;
  //         const addedMessage = subscriptionData.data.addedMessage;

  //         return {
  //           ...prev,
  //           messages: [addedMessage, ...prev.messages]
  //         };
  //       }
  //     }),
  //   [subscribeToMore]
  // );

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error</div>;
  }

  return (
    <ul>
      {data.messages.map(message => (
        <li key={message.id}>{message.text}</li>
      ))}
    </ul>
  );
}

export default MESSAGES_QUERY ? MessageList : Stub("MESSAGES_QUERY is not set");
