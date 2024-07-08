"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import { Trash } from "lucide-react";
import { useFormStatus } from "react-dom";
import Spinner from "../Spinner";
import RemoveDataDialog from "./RemoveDataDialog";

const CreateMockDataButton: React.FC = () => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  return (
    <>
      <Button
        variant="destructive"
        type="submit"
        onClick={() => setIsDialogOpen(true)}
        className="flex flex-row gap-x-2 cursor-pointer w-36 justify-start"
      >
        <Trash strokeWidth={1.5} /> Borrar datos
      </Button>
      <RemoveDataDialog isDialogOpen={isDialogOpen} setIsDialogOpen={setIsDialogOpen} />
    </>
  );
};

export default CreateMockDataButton;
