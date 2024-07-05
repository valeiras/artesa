import React from "react";
import { RotatingLines } from "react-loader-spinner";

type Props = { width?: string; strokeColor?: string };
const Spinner: React.FC<Props> = ({ width = "24", strokeColor = "green" }) => {
  return (
    <RotatingLines
      visible={true}
      width={width}
      strokeWidth="5"
      strokeColor={strokeColor}
      animationDuration="0.75"
      ariaLabel="rotating-lines-loading"
    />
  );
};

export default Spinner;
