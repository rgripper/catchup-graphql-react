import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import Stub from "../Stub";

const ADD_MESSAGE_MUTATION = null;

function MessageForm() {
  const [addMessage, { loading, error }] = useMutation(ADD_MESSAGE_MUTATION);
  const [text, setText] = useState("");

  return (
    <form
      className="login"
      onSubmit={async e => {
        e.preventDefault();
        await addMessage({ variables: { text } });
        setText("");
      }}
    >
      <fieldset disabled={loading}>
        <input placeholder="Message" value={text} onChange={e => setText(e.currentTarget.value)} />
        <button>Send</button>
        {error && <div>Error</div>}
      </fieldset>
    </form>
  );
}

export default ADD_MESSAGE_MUTATION ? MessageForm : Stub("ADD_MESSAGE_MUTATION is not set");
