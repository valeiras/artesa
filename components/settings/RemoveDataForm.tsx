"use client";

import React from "react";
import { Button } from "../ui/button";
import { Trash, X } from "lucide-react";
import Spinner from "../Spinner";
import { removeAllData } from "@/lib/actions/removeAllData";
import { useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "../ui/use-toast";

type Props = { setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>> };
const RemoveDataForm: React.FC<Props> = ({ setIsDialogOpen }) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();

  const onSubmit = async () => {
    await removeAllData();
    queryClient.invalidateQueries();
    setIsDialogOpen(false);
    toast({ title: "Datos eliminados con éxito" });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-row w-full gap-2">
        <CancelButton setIsDialogOpen={setIsDialogOpen} isSubmitting={isSubmitting} />
        <SubmitButton isSubmitting={isSubmitting} />
      </div>
    </form>
  );
};

const SubmitButton = ({ isSubmitting }: { isSubmitting: boolean }) => {
  return (
    <Button
      variant="destructive"
      type="submit"
      disabled={isSubmitting}
      className="flex flex-row gap-x-2 cursor-pointer w-36 justify-start"
    >
      {isSubmitting ? (
        <>
          <Spinner strokeColor="white" />
          Borrando...
        </>
      ) : (
        <>
          <Trash strokeWidth={1.5} /> Borrar datos
        </>
      )}
    </Button>
  );
};

const CancelButton = ({
  setIsDialogOpen,
  isSubmitting,
}: {
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isSubmitting: boolean;
}) => {
  return (
    <Button
      variant="outline"
      type="button"
      disabled={isSubmitting}
      className="flex flex-row gap-x-2 cursor-pointer w-36 justify-start"
      onClick={() => {
        setIsDialogOpen(false);
      }}
    >
      {isSubmitting ? (
        <>
          <Spinner />
          Borrando...
        </>
      ) : (
        <>
          <X strokeWidth={1.5} /> Cancelar
        </>
      )}
    </Button>
  );
};
export default RemoveDataForm;
