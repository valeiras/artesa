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
    <Card className={cn("w-full max-w-[800px] md:pr-8", className)}>
      <CardHeader>
        <CardTitle>Lotes:</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="pl-3 list-disc list-inside">
          {batches?.map(({ id, external_id }) => {
            return (
              <li key={id}>
                <Link href={`/lotes/${linkBase}/${external_id}`} className="text-sm">
                  {external_id}
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
