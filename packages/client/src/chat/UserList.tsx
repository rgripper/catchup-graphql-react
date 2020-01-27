import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import React, { useEffect } from "react";

export const USERS_QUERY = gql`
  {
    users {
      id
      name
    }
  }
`;

export const ADDED_USER_SUBSCRIPTION = gql`
  subscription {
    addedUser {
      id
      name
    }
  }
`;

function UserList() {
  const { loading, error, data, subscribeToMore } = useQuery(USERS_QUERY);
  useEffect(() => {
    subscribeToMore({
      document: ADDED_USER_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        console.log(subscriptionData.data);
        if (!subscriptionData.data.addedUser) return prev;
        const addedUser = subscriptionData.data.addedUser;
        console.log(prev.users, addedUser);
        return {
          ...prev,
          users: [addedUser, ...prev.users]
        };
      }
    });
  }, [subscribeToMore]);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error</div>;
  }

  return (
    <ul>
      {data.users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}

export default UserList;
