import React from "react";
import { Card, CardContent } from "../ui/card";
import { ReadProductBatchWithAmountsAndIngredientsType } from "@/lib/types/types";
import { valueToLabel } from "@/lib/db/units";

type Props = { currBatch: ReadProductBatchWithAmountsAndIngredientsType; availableAmount: number };

const ProductBatchInfoCard: React.FC<Props> = ({ currBatch, availableAmount }) => {
  console.log(currBatch);
  return (
    <Card className="w-full max-w-[800px]">
      <CardContent>
        <div className="grid grid-cols-2 justify-items-stretch pt-5 gap-2">
          <p>
            <span className="font-semibold">Producto:</span> {currBatch.product.name}
          </p>
          <p className="justify-self-end">
            <span className="font-semibold">Cantidad disponible:</span> {availableAmount}{" "}
            {valueToLabel[currBatch.product.unit || "unit"]}
          </p>
          <div>
            <p className="font-semibold mb-1">Ingredientes:</p>
            <ul className="text-sm pl-2">
              {currBatch.contained_batches.map(
                ({ id, used_amount: usedAmount, product_batch: productBatch, commodity_batch: commodityBatch }) => {
                  const externalId = productBatch?.external_id || commodityBatch?.external_id;
                  const name = productBatch?.product.name || commodityBatch?.commodity.name;
                  const unit = productBatch?.product.unit || commodityBatch?.commodity.unit;
                  return <li key={id}>{`- ${externalId} - ${name} (${usedAmount}${unit})`}</li>;
                }
              )}
            </ul>
          </div>
          <p className="justify-self-end">
            <span className="font-semibold">Fecha:</span> {new Date(currBatch.date).toLocaleDateString()}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductBatchInfoCard;
