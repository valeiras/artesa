import React from "react";
import Spinner from "./Spinner";

type Props = { message: string };

const LoadingMessage: React.FC<Props> = ({ message }) => {
  return (
    <div className="flex flex-row gap-2 align-middle">
      <Spinner />
      <h3>{message}</h3>
    </div>
  );
};

export default LoadingMessage;
