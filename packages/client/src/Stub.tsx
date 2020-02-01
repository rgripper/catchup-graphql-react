import React from "react";

const Stub = (message: string) => () => (
  <div
    style={{
      fontSize: "32px",
      color: "#c77",
      padding: "16px",
      height: "100%"
    }}
  >
    <div
      style={{
        border: "1px solid #c77",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%"
      }}
    >
      {message}
    </div>
  </div>
);

export default Stub;
