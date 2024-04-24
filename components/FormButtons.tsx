import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Check, X, Clock } from "lucide-react";
import { useDataTableContext } from "./dataTable/dataTableContext";
import { DialogClose } from "@radix-ui/react-dialog";

type Props = {
  isPending: boolean;
  submitButtonLabel: string;
};
const FormButtons: React.FC<Props> = ({ isPending, submitButtonLabel }) => {
  const dataTableContext = useDataTableContext();
  if (dataTableContext === null) throw new Error("Data table context if missing");

  return (
    <div className="flex flex-row gap-x-2 justify-start mt-12">
      <Button type="submit" className="w-32 flex flex-row justify-center gap-x-1 px-2" disabled={isPending}>
        {isPending ? (
          <>
            <Clock strokeWidth={1.5} />
            <span className="text-left">Cargando</span>
          </>
        ) : (
          <>
            <Check strokeWidth={1.5} />
            <span className="text-left">{submitButtonLabel}</span>
          </>
        )}
      </Button>
      <DialogClose>
        <Button
          variant="destructive"
          className="w-32 flex flex-row justify-center gap-x-1 px-2"
          disabled={isPending}
          type="button"
        >
          <X strokeWidth={1.5} />
          {isPending ? <span className="text-left">Cargando</span> : <span className="text-left">Cancelar</span>}
        </Button>
      </DialogClose>
    </div>
  );
};

export default FormButtons;
