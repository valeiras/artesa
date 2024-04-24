import { ReadCommodityWithBatchesType, ReadProductWithBatchesType } from "@/lib/types";
import { Row } from "@tanstack/react-table";
import React from "react";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import CustomTooltip from "./CustomTooltip";
import CustomDialog from "./CustomDialog";
import NewCommodityBatchForm from "./commodityBatches/NewCommodityBatchForm";

type Props = { row: Row<ReadCommodityWithBatchesType | ReadProductWithBatchesType> };

const BatchContainer: React.FC<Props> = ({ row }) => {
  const batches = row.original["batches"];
  const NewBatchButton = () => {
    return (
      <Button className="w-6 h-6 p-0.5 rounded-full" asChild>
        <Plus strokeWidth={2.5} size={16} />
      </Button>
    );
  };

  return (
    <div className="flex flex-row items-end justify-start">
      <ScrollArea className="w-48 h-fit rounded-md border" maxHeight="110px">
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
      <div className="-mb-3 -ml-3 z-40">
        <CustomTooltip tooltipContent="Crear nuevo lote">
          <CustomDialog DialogTriggerContent={NewBatchButton()}>
            <NewCommodityBatchForm commodityData={row.original} />
          </CustomDialog>
        </CustomTooltip>
      </div>
    </div>
  );
};

export default BatchContainer;
