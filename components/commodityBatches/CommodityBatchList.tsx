import { getAmountEvolution } from "@/lib/charts/getAmountEvolution";
import { ReadCommodityBatchWithAmountsType } from "@/lib/types/types";
import Link from "next/link";
import React from "react";

type Props = { batches: ReadCommodityBatchWithAmountsType[] | undefined };

const CommodityBatchList: React.FC<Props> = ({ batches }) => {
  const amountEvolutionPerBatch = batches?.map((batch) => {
    return {
      id: batch.id,
      amountEvolution: getAmountEvolution(batch),
    };
  });

  console.log(amountEvolutionPerBatch);
  return (
    <div className="flex flex-col">
      <h3 className="text-xl font-bold mb-2">Lotes:</h3>
      <div className="flex flex-col gap-1">
        {batches?.map(({ id, external_id }) => {
          return (
            <Link href={`/lotes/materias-primas/${external_id}`} key={id}>
              {external_id}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default CommodityBatchList;
