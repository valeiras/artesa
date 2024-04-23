import { ReadCommodityWithBatches, ReadProductWithBatches } from "@/lib/types";
import { Row } from "@tanstack/react-table";
import React from "react";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

type Props = { row: Row<ReadCommodityWithBatches | ReadProductWithBatches>; itemAddress: string };
const BatchesContainer: React.FC<Props> = ({ row, itemAddress }) => {
  const batches = row.original["batches"];
  return (
    <div className="flex flex-row items-start p-0.5 gap-x-4">
      <div className="flex flex-col">
        {!batches || batches.length === 0
          ? "No hay lotes disponibles"
          : batches.map((batch) => {
              return batch.id;
            })}
      </div>
      <Button className="w-fit h-fit p-0.5 rounded-full" asChild>
        <Link href={`/${itemAddress}/${row.original["id"]}/nuevo-lote`}>
          <Plus strokeWidth={2.5} size={16} />
        </Link>
      </Button>
    </div>
  );
};

export default BatchesContainer;
