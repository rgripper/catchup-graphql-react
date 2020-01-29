import { useQuery } from "@apollo/react-hooks";
import React, { useEffect } from "react";
import gql from "graphql-tag";

export const USERS_QUERY = gql`
  {
    users {
      id
      name
      avatarUrl
    }
  }
`;

export const ADDED_USER_SUBSCRIPTION = gql`
  subscription {
    addedUser {
      id
      name
      avatarUrl
    }
  }
`;

function UserList() {
  const { loading, error, data, subscribeToMore } = useQuery(USERS_QUERY);
  useEffect(
    () =>
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
      }),
    [subscribeToMore]
  );

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error</div>;
  }

  return (
    <ul className="user-list">
      {[...data.users]
        .sort((a, b) => a.name.localeCompare(b.name))
        .map(user => (
          <li key={user.id}>
            <img style={{ width: "40px" }} src={user.avatarUrl} alt="Avatar" />
            <span>{user.name}</span>
          </li>
        ))}
    </ul>
  );
}

export default UserList;
