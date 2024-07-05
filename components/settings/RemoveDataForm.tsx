"use client";

import React from "react";
import { Button } from "../ui/button";
import { Trash, X } from "lucide-react";
import Spinner from "../Spinner";
import { removeAllData } from "@/lib/actions/removeAllData";
import { useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";

type Props = { setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>> };
const RemoveDataForm: React.FC<Props> = ({ setIsDialogOpen }) => {
  const queryClient = useQueryClient();

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();

  const onSubmit = async () => {
    await removeAllData();
    queryClient.invalidateQueries();
    setIsDialogOpen(false);
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
      className="flex flex-row gap-x-2 cursor-pointer w-44 justify-start"
    >
      {isSubmitting ? (
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
      className="flex flex-row gap-x-2 cursor-pointer w-44 justify-start"
      onClick={() => {
        setIsDialogOpen(false);
      }}
    >
      {isSubmitting ? (
        <>
          <Spinner strokeColor="white" />
          Borrando datos...
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
