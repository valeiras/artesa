import React from "react";
import { ScrollArea } from "./ui/scroll-area";

type Props = { comments: string | null };

const CommentsContainer: React.FC<Props> = ({ comments }) => {
  if (!comments) return null;
  return (
    <ScrollArea className="max-w-48 h-fit p-2 rounded-md border" viewportClassName="max-h-[60px]">
      {comments}
    </ScrollArea>
  );
};

export default CommentsContainer;
