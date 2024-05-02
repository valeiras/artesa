import React from "react";
import { ReadBatchDBType, ReadItemDBType, ReadProductBatchDBType } from "@/lib/types";
import BatchRowActions from "./rowActions/BatchRowActions";

const Batch: React.FC<{
  batchData: ReadBatchDBType;
  itemData: ReadItemDBType;
  deleteBatchMutation: () => void;
}> = ({ batchData, deleteBatchMutation, itemData }) => {
  return (
    <div className="text-sm grid grid-cols-[auto_20px] max-w-full items-center pr-2">
      <div className="overflow-hidden pr-1 truncate">{batchData.external_id}</div>
      <BatchRowActions deleteBatchMutation={deleteBatchMutation} batchData={batchData} itemData={itemData} />
    </div>
  );
};

export default Batch;
