import React from "react";

const Intermediate = ({ onDone }) =>  {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection:"column",
        gap:"10px"
      }}
    >
      Make sure you are in a dark room before developing the image{" "}
      <button onClick={() => onDone("third")}>Next Step</button>
    </div>
  );
}

export default Intermediate;
