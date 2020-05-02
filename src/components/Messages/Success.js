import React from "react";

const Success = (props) => {
  return (
    <div className="alert alert-success" role="alert">
      {props.message}
    </div>
  );
};

export default Success;
