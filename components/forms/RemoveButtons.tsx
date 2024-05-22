import React from "react";
import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";

type Props = { removeRow: (idx: number) => void; nbRows: number };

const RemoveButtons: React.FC<Props> = ({ removeRow, nbRows }) => {
  const indices = Array.from(Array(nbRows).keys());
  return (
    <div className="flex flex-col gap-4 mt-4">
      {indices.map((index) => {
        return (
          <Button variant="destructive" onClick={() => removeRow(index)} type="button" key={index} className="mt-1">
            <Trash2 />
          </Button>
        );
      })}
    </div>
  );
};

export default RemoveButtons;
