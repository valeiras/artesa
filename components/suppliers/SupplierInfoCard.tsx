import { ReadSupplierWithBatchesType } from "@/lib/types/types";
import React from "react";
import { Card, CardContent } from "../ui/card";
import { cn } from "@/lib/utils";

import SupplierBatches from "./SupplierBatches";

type Props = { currSupplier: ReadSupplierWithBatchesType; className?: string };

const SupplierInfoCard: React.FC<Props> = ({ currSupplier, className }) => {
  return (
    <Card className={cn("w-full max-w-[800px]", className)}>
      <CardContent className="grid md:grid-cols-2 pt-5 gap-1">
        <div className="flex gap-2">
          &#x2022;
          <span className="font-semibold">Dirección:</span>
          {currSupplier.address}
        </div>
        <div className="flex gap-2">
          &#x2022;
          <span className="font-semibold">Email:</span>
          <a href={`mailto:${currSupplier.email}`}>{currSupplier.email}</a>
        </div>
        <div className="flex gap-2">
          &#x2022;
          <span className="font-semibold">Teléfono:</span>
          <a href={`tel:${currSupplier.phone}`}>{currSupplier.phone}</a>
        </div>
        <div className="flex gap-2">
          &#x2022;
          <span className="font-semibold">Comentarios:</span>
          {currSupplier.comments}
        </div>
        <div className="flex gap-2 md:col-span-2">
          &#x2022;
          <div className="flex flex-col">
            <span className="font-semibold">Lotes:</span>
            <SupplierBatches commodityBatches={currSupplier.commodity_batches} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SupplierInfoCard;
