"use client";

import React from "react";
import { Button } from "../ui/button";
import { FlaskConical } from "lucide-react";
import { createMockupData } from "@/lib/actions/createMockupData";
import { useFormStatus } from "react-dom";
import Spinner from "../Spinner";
import { useToast } from "../ui/use-toast";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

const CreateMockDataButton: React.FC = () => {
  const { toast } = useToast();
  const onSubmit = async () => {
    await createMockupData();
    toast({ title: "Datos de prueba creados con éxito" });
  };

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <SubmitButton isSubmitting={isSubmitting} />
    </form>
  );
};

const SubmitButton = ({ isSubmitting }: { isSubmitting: boolean }) => {
  return (
    <Button
      variant="default"
      type="submit"
      disabled={isSubmitting}
      className="flex flex-row gap-x-2 cursor-pointer w-36 justify-start"
    >
      {isSubmitting ? (
        <>
          <Spinner strokeColor="white" />
          Subiendo...
        </>
      ) : (
        <>
          <FlaskConical strokeWidth={1.5} /> Subir datos
        </>
      )}
    </Button>
  );
};
export default CreateMockDataButton;
