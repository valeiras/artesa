"use client";

import React from "react";
import { Button } from "../ui/button";
import { Trash } from "lucide-react";
import { useFormStatus } from "react-dom";
import Spinner from "../Spinner";
import { removeAllData } from "@/lib/actions/removeAllData";

const CreateMockDataButton: React.FC = () => {
  return (
    <form action={removeAllData}>
      <SubmitButton />
    </form>
  );
};

const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button
      variant="destructive"
      type="submit"
      disabled={pending}
      className="flex flex-row gap-x-2 cursor-pointer w-44 justify-start"
    >
      {pending ? (
        <>
          <Spinner strokeColor="white" />
          Borrando datos...
        </>
      ) : (
        <>
          <Trash strokeWidth={1.5} /> Borrar datos
        </>
      )}
    </Button>
  );
};
export default CreateMockDataButton;
