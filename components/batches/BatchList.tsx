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
        <ul className="text-sm pl-2">
          {batches?.map(({ id, external_id }) => {
            return (
              <li key={id}>
                <Link href={`/lotes/${linkBase}/${external_id}`} className="text-sm">
                  - {external_id}
                </Link>
              </li>
            );
          })}
        </ul>
      </CardContent>
    </Card>
  );
};

export default BatchList;
