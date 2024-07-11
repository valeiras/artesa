import React from "react";
import { ReadBatchDBType, ReadItemDBType } from "@/lib/types/types";
import BatchRowActions from "./rowActions/BatchRowActions";

const Batch: React.FC<{
  batchData: ReadBatchDBType;
  itemData: ReadItemDBType;
  deleteBatchMutation: () => void;
  seeLinkbase: string;
}> = ({ batchData, deleteBatchMutation, itemData, seeLinkbase }) => {
  return (
    <div className="text-sm grid grid-cols-[auto_20px] max-w-full items-center pr-2">
      <div className="overflow-hidden pr-1 truncate">{batchData.external_id}</div>
      <BatchRowActions
        deleteBatchMutation={deleteBatchMutation}
        batchData={batchData}
        itemData={itemData}
        seeLink={`${seeLinkbase}/${batchData.external_id}`}
      />
    </div>
  );
};

export default Batch;
