import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

const ADD_MESSAGE_MUTATION = gql`
  mutation AddMessage($text: String!) {
    addMessage(text: $text) {
      id
    }
  }
`;

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
        {error && <div>Error</div>}
        <div>
          <button>Send</button>
        </div>
      </fieldset>
    </form>
  );
}

export default MessageForm;
