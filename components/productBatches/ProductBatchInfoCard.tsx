import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { ReadProductBatchWithAmountsAndIngredientsType } from "@/lib/types/types";
import { valueToLabel } from "@/lib/db/units";
import { cn } from "@/lib/utils";
import Link from "next/link";

type Props = { currBatch: ReadProductBatchWithAmountsAndIngredientsType; availableAmount: number; className?: string };

const ProductBatchInfoCard: React.FC<Props> = ({ currBatch, availableAmount, className }) => {
  return (
    <Card className={cn("w-full max-w-[800px]", className)}>
      <CardHeader>
        <CardTitle>Información:</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-[auto_auto_auto] gap-1 gap-x-3">
          <>
            &#x2022;
            <span className="font-semibold">Producto:</span>
            <Link href={`/productos-finales/${currBatch.product.id}`}>{currBatch.product.name}</Link>
          </>
          <>
            &#x2022;
            <span className="font-semibold">Cantidad disponible:</span>
            <span>
              {availableAmount} {valueToLabel[currBatch.product.unit || "unit"]}
            </span>
          </>
          <>
            &#x2022;
            <span className="font-semibold">Fecha:</span>
            <span>{new Date(currBatch.date).toLocaleDateString()}</span>
          </>
          <>
            &#x2022;
            <div className="col-span-2">
              <span className="font-semibold">Ingredientes:</span>
              <div className="pl-2 grid grid-cols-[repeat(3,auto)] mt-1 w-fit gap-x-4">
                {currBatch.contained_batches.map(
                  ({ id, used_amount: usedAmount, product_batch: productBatch, commodity_batch: commodityBatch }) => {
                    const batchExternalId = productBatch?.external_id || commodityBatch?.external_id;
                    const itemId = productBatch?.product.id || commodityBatch?.commodity.id;
                    const name = productBatch?.product.name || commodityBatch?.commodity.name;
                    const unit = productBatch?.product.unit || commodityBatch?.commodity.unit;
                    const typeOfItemlinkSegment = productBatch ? "productos-finales" : "materias-primas";
                    const batchLink = `/lotes/${typeOfItemlinkSegment}/${batchExternalId}`;
                    const itemLink = `/${typeOfItemlinkSegment}/${itemId}`;
                    return (
                      <React.Fragment key={id}>
                        <span>
                          - <Link href={itemLink}>{name}</Link>
                          {` (${usedAmount} ${valueToLabel[unit!]})`}
                        </span>
                        <span>-</span>
                        <Link href={batchLink}>{batchExternalId}</Link>
                      </React.Fragment>
                    );
                  }
                )}
              </div>
            </div>
          </>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductBatchInfoCard;
