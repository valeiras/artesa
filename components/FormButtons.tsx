import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Check, X, Clock } from "lucide-react";

type Props = { isPending: boolean; submitButtonLabel: string; cancelButtonHref: string };
const FormButtons: React.FC<Props> = ({ isPending, submitButtonLabel, cancelButtonHref }) => {
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
      {isPending ? (
        <Button variant="destructive" className="w-32 flex flex-row justify-center gap-x-1 px-2" disabled>
          <X strokeWidth={1.5} />
          <span className="text-left">Cargando</span>
        </Button>
      ) : (
        <Button variant="destructive" className="w-32 flex flex-row justify-center gap-x-1 px-2" asChild>
          <Link href={cancelButtonHref}>
            <X strokeWidth={1.5} /> <span className="text-left">Cancelar</span>
          </Link>
        </Button>
      )}
    </div>
  );
};

export default FormButtons;
