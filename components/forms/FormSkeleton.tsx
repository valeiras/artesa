import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

type Props = { formHeader: string };

export default function FormSkeleton({ formHeader }: Props): React.JSX.Element {
  return (
    <div className="bg-muted p-8 rounded">
      <h2 className="font-semibold text-4xl mb-6">{formHeader}</h2>
      <div className="form-content">
        <Skeleton className="h-8 w-4/5 bg-gray-300" />
        <Skeleton className="h-8 w-4/5 bg-gray-300" />
        <Skeleton className="h-8 w-4/5 bg-gray-300" />
      </div>
    </div>
  );
}
