import { getAmountEvolution } from "@/lib/charts/getAmountEvolution";
import { ReadCommodityBatchWithAmountsType, ReadProductBatchWithAmountsType } from "@/lib/types/types";
import Link from "next/link";
import React from "react";

type Props = {
  batches: ReadCommodityBatchWithAmountsType[] | ReadProductBatchWithAmountsType[] | undefined;
  linkBase: "materias-primas" | "productos-finales";
};

const BatchList: React.FC<Props> = ({ batches, linkBase }) => {
  return (
    <div className="flex flex-col">
      <h3 className="text-xl font-bold mb-2">Lotes:</h3>
      <div className="flex flex-col gap-1">
        {batches?.map(({ id, external_id }) => {
          return (
            <Link href={`/lotes/${linkBase}/${external_id}`} key={id}>
              {external_id}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default BatchList;
