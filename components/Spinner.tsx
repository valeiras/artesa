import React from "react";
import { RotatingLines } from "react-loader-spinner";

type Props = { width?: string };
const Spinner: React.FC<Props> = ({ width = "24" }) => {
  return (
    <RotatingLines
      visible={true}
      width={width}
      strokeWidth="5"
      strokeColor="green"
      animationDuration="0.75"
      ariaLabel="rotating-lines-loading"
    />
  );
};

export default Spinner;
