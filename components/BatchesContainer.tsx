import { ReadCommodityWithBatches, ReadProductWithBatches } from "@/lib/types";
import { Row } from "@tanstack/react-table";
import React from "react";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import CustomTooltip from "./CustomTooltip";

type Props = { row: Row<ReadCommodityWithBatches | ReadProductWithBatches>; itemAddress: string };
const BatchesContainer: React.FC<Props> = ({ row, itemAddress }) => {
  const batches = row.original["batches"];
  return (
    <div className="flex flex-row items-end justify-start">
      <ScrollArea className="h-[72px] w-64 rounded-md border">
        <div className="p-2">
          {!batches || batches.length === 0
            ? "No hay lotes disponibles"
            : batches.map((batch, idx) => (
                <React.Fragment key={batch.id}>
                  {idx !== 0 && <Separator className="my-2" />}
                  <div className="text-sm">{batch.external_id}</div>
                </React.Fragment>
              ))}
        </div>
      </ScrollArea>
      <div className="-mb-3 -ml-3 z-50">
        <CustomTooltip tooltipContent="Crear nuevo lote">
          <Button className="w-6 h-6 p-0.5 rounded-full" asChild>
            <Link href={`/${itemAddress}/${row.original["id"]}/nuevo-lote`}>
              <Plus strokeWidth={2.5} size={16} />
            </Link>
          </Button>
        </CustomTooltip>
      </div>
    </div>
  );
};

export default BatchesContainer;
