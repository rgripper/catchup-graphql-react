import { gql } from "apollo-boost";
import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";

const FRUIT_FORM = gql`
  mutation addFruit($name: String!) {
    addFruit(fruit: { $name })
  }
`;

function FruitForm() {
  const [addFruit, { loading, error }] = useMutation(FRUIT_FORM);
  if (loading) {
    return <div>Adding...</div>;
  }
  if (error) {
    return <div>Error</div>;
  }

  const [name, setName] = useState("");
  return (
    <form
      onSubmit={() => {
        const fruit = { name };
        addFruit({ variables: fruit });
        setName("");
      }}
    >
      <input placeholder="Fruit name" value={name} onChange={e => setName(e.currentTarget.value)} />
      <button>Add fruit</button>
    </form>
  );
}

export default FruitForm;
