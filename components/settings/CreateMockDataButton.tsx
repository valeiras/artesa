"use client";

import React from "react";
import { Button } from "../ui/button";
import { Clock, FlaskConical } from "lucide-react";
import { createMockupData } from "@/lib/actions/createMockupData";
import { useFormStatus } from "react-dom";
import Spinner from "../Spinner";

const CreateMockDataButton: React.FC = () => {
  return (
    <form action={createMockupData}>
      <SubmitButton />
    </form>
  );
};

const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button
      variant="default"
      type="submit"
      disabled={pending}
      className="flex flex-row gap-x-2 cursor-pointer w-56 justify-start"
    >
      {pending ? (
        <>
          <Spinner strokeColor="white" />
          Subiendo datos...
        </>
      ) : (
        <>
          <FlaskConical strokeWidth={1.5} /> Subir datos de prueba
        </>
      )}
    </Button>
  );
};
export default CreateMockDataButton;
