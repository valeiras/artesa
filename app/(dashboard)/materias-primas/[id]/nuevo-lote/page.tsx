import React from "react";

type Props = { params: { id: string } };

const page: React.FC<Props> = ({ params }) => {
  return <div>{params.id}</div>;
};

export default page;
