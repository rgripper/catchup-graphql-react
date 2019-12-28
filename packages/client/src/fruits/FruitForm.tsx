import { gql } from "apollo-boost";
import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";

const FRUIT_FORM = gql`
  mutation addFruit($input: AddFruitInput!) {
    addFruit(input: $input) {
      id
      name
    }
  }
`;

function FruitForm() {
  const [addFruit, { loading, error }] = useMutation(FRUIT_FORM);
  const [name, setName] = useState("");

  if (loading) {
    return <div>Adding...</div>;
  }
  if (error) {
    return <div>Error</div>;
  }

  return (
    <form
      onSubmit={() => {
        const input = { name };
        const fruit = addFruit({ variables: { input } });
        setName("");
        //onAdded(fruit);
      }}
    >
      <input placeholder="Fruit name" value={name} onChange={e => setName(e.currentTarget.value)} />
      <button>Add fruit</button>
    </form>
  );
}

export default FruitForm;
