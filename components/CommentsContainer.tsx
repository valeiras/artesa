import React from "react";

type Props = { comments: string | null };

const CommentsContainer: React.FC<Props> = ({ comments }) => {
  if (!comments) return null;
  return <div className="max-w-48 h-fit px-2">{comments}</div>;
};

export default CommentsContainer;
