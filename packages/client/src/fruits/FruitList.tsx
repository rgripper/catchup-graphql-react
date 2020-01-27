import { gql } from "apollo-boost";
import React, { useState } from "react";
import { useQuery } from "@apollo/react-hooks";

export const FRUITS_QUERY = gql`
  {
    fruits {
      name
    }
  }
`;

function FruitList() {
  const { loading, error, data, refetch } = useQuery(FRUITS_QUERY);
  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error</div>;
  }

  return (
    <ul>
      {data.fruits.map(fruit => (
        <li key={fruit.name}>{fruit.name}</li>
      ))}
    </ul>
  );
}

export default FruitList;
