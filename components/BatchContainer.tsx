import {
  ReadCommodityBatchDBType,
  ReadCommodityWithBatchesType,
  ReadProductBatchDBType,
  ReadProductWithBatchesType,
} from "@/lib/types";
import { Row } from "@tanstack/react-table";
import React from "react";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import CustomTooltip from "./CustomTooltip";
import CustomDialog from "./CustomDialog";
import NewCommodityBatchForm from "./commodityBatches/NewCommodityBatchForm";
import Batch from "./Batch";
import { UseMutateFunction } from "@tanstack/react-query";
import { PostgrestError } from "@supabase/supabase-js";
import UpdateCommodityBatchForm from "./commodityBatches/UpdateCommodityBatchForm";

type Props = {
  itemData: ReadCommodityWithBatchesType;
  UpdateBatchForm: typeof UpdateCommodityBatchForm;
  NewBatchForm: typeof NewCommodityBatchForm;
  mutateBatch: UseMutateFunction<{ dbError: PostgrestError | null }, Error, number, unknown>;
};

const BatchContainer: React.FC<Props> = ({ UpdateBatchForm, NewBatchForm, mutateBatch, itemData }) => {
  const { batches } = itemData;
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
        <div className="p-2 w-48">
          {!batches || batches.length === 0
            ? "No hay lotes disponibles"
            : batches.map((batchData, idx) => (
                <React.Fragment key={batchData.id}>
                  {idx !== 0 && <Separator className="my-2" />}
                  <Batch
                    batchData={batchData}
                    UpdateBatchForm={<UpdateBatchForm batchData={batchData} itemData={itemData} />}
                    deleteBatchMutation={() => mutateBatch(batchData.id)}
                  />
                </React.Fragment>
              ))}
        </div>
      </ScrollArea>
      <div className="-mb-3 -ml-3 z-40">
        <CustomTooltip tooltipContent="Crear nuevo lote">
          <CustomDialog DialogTriggerContent={NewBatchButton()}>
            <NewCommodityBatchForm itemData={itemData} />
          </CustomDialog>
        </CustomTooltip>
      </div>
    </div>
  );
};

export default BatchContainer;
