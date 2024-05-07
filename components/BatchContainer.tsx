import {
  ReadCommodityBatchDBType,
  ReadCommodityDBType,
  ReadProductBatchDBType,
  ReadProductDBType,
  ReadProductWithIngredientsType,
} from "@/lib/types";
import React from "react";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import CustomTooltip from "./CustomTooltip";
import Batch from "./Batch";
import { UseMutateFunction } from "@tanstack/react-query";
import { PostgrestError } from "@supabase/supabase-js";
import { useDataTableContext } from "./dataTable/dataTableContext";

function BatchContainer<
  TItem extends ReadCommodityDBType | ReadProductWithIngredientsType,
  TBatch extends ReadCommodityBatchDBType | ReadProductBatchDBType
>({
  itemData,
  batches,
  mutateBatch,
}: {
  itemData: TItem;
  batches: TBatch[];
  mutateBatch: UseMutateFunction<{ dbError: PostgrestError | null }, Error, number, unknown>;
}) {
  const dataTableContext = useDataTableContext();
  if (dataTableContext === null) throw new Error("Falta el contexto de la tabla...");
  const { setItemData, setIsNewBatchDialogOpen } = dataTableContext;

  const NewBatchButton = () => {
    return (
      <Button className="w-6 h-6 p-0.5 rounded-full" asChild>
        <Plus
          strokeWidth={2.5}
          size={16}
          onClick={() => {
            setItemData(itemData);
            setIsNewBatchDialogOpen(true);
          }}
        />
      </Button>
    );
  };

  return (
    <div className="flex flex-row items-end justify-start">
      <ScrollArea className="w-48 h-fit rounded-md border" viewportClassName="max-h-[110px]">
        <div className="p-2 w-48">
          {!batches || batches.length === 0
            ? "No hay lotes disponibles"
            : batches.map((batchData, idx) => (
                <React.Fragment key={batchData.id}>
                  {idx !== 0 && <Separator className="my-2" />}
                  <Batch
                    batchData={batchData}
                    itemData={itemData}
                    deleteBatchMutation={() => mutateBatch(batchData.id)}
                  />
                </React.Fragment>
              ))}
        </div>
      </ScrollArea>
      <div className="-mb-3 -ml-3 z-40">
        <CustomTooltip tooltipContent="Crear nuevo lote">
          <NewBatchButton />
        </CustomTooltip>
      </div>
    </div>
  );
}

export default BatchContainer;
