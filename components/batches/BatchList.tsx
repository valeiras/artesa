import { ReadCommodityBatchWithAmountsType, ReadProductBatchWithAmountsType } from "@/lib/types/types";
import Link from "next/link";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

type Props = {
  batches: ReadCommodityBatchWithAmountsType[] | ReadProductBatchWithAmountsType[] | undefined;
  linkBase: "materias-primas" | "productos-finales";
};

const BatchList: React.FC<Props> = ({ batches, linkBase }) => {
  return (
    <Card className="flex flex-col mb-4 w-full max-w-[800px] pt-5">
      <CardContent>
        <h3 className="text-xl font-bold mb-1">Lotes:</h3>
        <div className="flex flex-col gap-1">
          {batches?.map(({ id, external_id }) => {
            return (
              <Link href={`/lotes/${linkBase}/${external_id}`} key={id} className="text-sm">
                {external_id}
              </Link>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default BatchList;
