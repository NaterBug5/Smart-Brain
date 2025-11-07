import React from "react";
import "./rank-component";

const Rank = ({ name }) => {
  return (
    <>
      <div>
        <h1>{`${name},`}</h1>
      </div>
      <div>{/* <h1>{entries}</h1> */}</div>
    </>
  );
};

export default Rank;
