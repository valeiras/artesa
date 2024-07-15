import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { ReadCommodityBatchWithAmountsType } from "@/lib/types/types";
import { valueToLabel } from "@/lib/db/units";
import { cn } from "@/lib/utils";
import Link from "next/link";

type Props = { currBatch: ReadCommodityBatchWithAmountsType; availableAmount: number; className?: string };

const CommodityBatchInfoCard: React.FC<Props> = ({ currBatch, availableAmount, className }) => {
  return (
    <Card className={cn("w-full max-w-[800px]", className)}>
      <CardHeader>
        <CardTitle>Información:</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-[auto_auto_auto] gap-1 gap-x-3">
          <>
            &#x2022;
            <span className="font-semibold">Materia prima:</span>
            <Link href={`/materias-primas/${currBatch.commodity.id}`}>{currBatch.commodity.name}</Link>
          </>
          <>
            &#x2022;
            <span className="font-semibold">Cantidad disponible:</span>
            <span>
              {availableAmount}
              {valueToLabel[currBatch.commodity.unit || "unit"]}
            </span>
          </>
          <>
            &#x2022;
            <span className="font-semibold">Proveedor:</span>
            <span>{currBatch.supplier.name}</span>
          </>
          <>
            &#x2022;
            <span className="font-semibold">Fecha:</span>
            <span>{new Date(currBatch.date).toLocaleDateString()}</span>
          </>
        </div>
      </CardContent>
    </Card>
  );
};

export default CommodityBatchInfoCard;
