import React from "react";
import { Card, CardContent } from "../ui/card";
import { ReadCommodityBatchWithAmountsType } from "@/lib/types/types";
import { valueToLabel } from "@/lib/db/units";

type Props = { currBatch: ReadCommodityBatchWithAmountsType; availableAmount: number };

const CommodityBatchInfoCard: React.FC<Props> = ({ currBatch, availableAmount }) => {
  return (
    <Card className="w-full max-w-[700px]">
      <CardContent>
        <div className="grid grid-cols-2 justify-items-stretch pt-4 gap-2">
          <p>
            <span className="font-semibold">Materia prima:</span> {currBatch.commodity.name}
          </p>
          <p className="justify-self-end">
            <span className="font-semibold">Cantidad disponible:</span> {availableAmount}{" "}
            {valueToLabel[currBatch.commodity.unit || "unit"]}
          </p>
          <p>
            <span className="font-semibold">Proveedor:</span> {currBatch.supplier.name}
          </p>
          <p className="justify-self-end">
            <span className="font-semibold">Fecha:</span> {new Date(currBatch.date).toLocaleDateString()}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default CommodityBatchInfoCard;
