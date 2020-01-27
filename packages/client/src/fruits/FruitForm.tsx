import { gql } from "apollo-boost";
import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { FRUITS_QUERY } from "./FruitList";

const ADD_FRUIT_MUTATION = gql`
  mutation addFruit($input: AddFruitInput!) {
    addFruit(input: $input) {
      id
      name
    }
  }
`;

function FruitForm() {
  const [addFruit, { loading, error }] = useMutation(ADD_FRUIT_MUTATION, {
    update(cache, { data: { addFruit } }) {
      const { fruits } = cache.readQuery({ query: FRUITS_QUERY });
      cache.writeQuery({
        query: FRUITS_QUERY,
        data: { fruits: fruits.concat([addFruit]) }
      });
    }
  });
  const [name, setName] = useState("");

  if (loading) {
    return <div>Adding...</div>;
  }
  if (error) {
    return <div>Error</div>;
  }

  return (
    <form
      onSubmit={async () => {
        const input = { name };
        await addFruit({ variables: { input } });
        setName("");
      }}
    >
      <input placeholder="Fruit name" value={name} onChange={e => setName(e.currentTarget.value)} />
      <button>Add fruit</button>
    </form>
  );
}

export default FruitForm;
