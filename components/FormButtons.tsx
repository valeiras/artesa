import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Check, X } from "lucide-react";

type Props = { isPending: boolean; submitButtonLabel: string; cancelButtonHref: string };
const FormButtons: React.FC<Props> = ({ isPending, submitButtonLabel, cancelButtonHref }) => {
  return (
    <div className="flex flex-row gap-x-2 justify-start">
      <Button type="submit" className="w-32 flex flex-row gap-x-1" disabled={isPending}>
        {isPending ? (
          "Cargando"
        ) : (
          <>
            <Check strokeWidth={1.5} />
            {submitButtonLabel}
          </>
        )}
      </Button>
      <Button variant="destructive" className="w-32" disabled={isPending} asChild>
        <Link href={cancelButtonHref} className="flex flex-row gap-x-1">
          <X strokeWidth={1.5} /> Cancelar
        </Link>
      </Button>
    </div>
  );
};

export default FormButtons;
