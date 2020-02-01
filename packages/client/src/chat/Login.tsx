import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import Stub from "../Stub";

const LOGIN_MUTATION = null;

function Login({ onSuccess }) {
  const [login, { loading, error }] = useMutation(LOGIN_MUTATION);
  const [name, setName] = useState("");

  return (
    <form
      className="login"
      onSubmit={async e => {
        e.preventDefault();
        const { data, errors } = await login({ variables: { name } });
        if (data) {
          onSuccess(data.login);
        }
      }}
    >
      <fieldset disabled={loading}>
        <input placeholder="Name" value={name} onChange={e => setName(e.currentTarget.value)} />
        {error && <div>Error</div>}
        <div>
          <button>Login</button>
        </div>
      </fieldset>
    </form>
  );
}

export default LOGIN_MUTATION ? Login : Stub("LOGIN_MUTATION is not set");
