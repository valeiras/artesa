import { ReadCommodityBatchWithAmountsType, ReadProductBatchWithAmountsType } from "@/lib/types/types";
import Link from "next/link";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { cn } from "@/lib/utils";

type Props = {
  batches: ReadCommodityBatchWithAmountsType[] | ReadProductBatchWithAmountsType[] | undefined;
  linkBase: "materias-primas" | "productos-finales";
  className?: string;
};

const BatchList: React.FC<Props> = ({ batches, linkBase, className }) => {
  return (
    <Card className={cn("flex flex-col w-full max-w-[800px] pt-5 pr-16", className)}>
      <CardContent>
        <h3 className="text-xl font-bold mb-1">Lotes:</h3>
        <ul className="text-sm pl-2 ">
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
