import React from "react";

const Stub = (message: string) => () => (
  <div
    style={{
      fontSize: "32px",
      border: "1px solid #c77",
      color: "#c77",
      margin: "16px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "100%"
    }}
  >
    {message}
  </div>
);

export default Stub;
