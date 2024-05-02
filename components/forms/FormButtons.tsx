import React from "react";
import { Button } from "@/components/ui/button";
import { Check, X, Clock } from "lucide-react";

type Props = {
  isPending: boolean;
  submitButtonLabel: string;
  setIsFormOpen: (isOpen: boolean) => void;
};
const FormButtons: React.FC<Props> = ({ isPending, submitButtonLabel, setIsFormOpen }) => {
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
      <Button
        variant="destructive"
        className="w-32 flex flex-row justify-center gap-x-1 px-2"
        type="button"
        onClick={() => setIsFormOpen(false)}
      >
        <X strokeWidth={1.5} />
        {isPending ? <span className="text-left">Cargando</span> : <span className="text-left">Cancelar</span>}
      </Button>
    </div>
  );
};

export default FormButtons;
