import React from "react";
import { ReadCommodityBatchDBType, ReadProductBatchDBType } from "@/lib/types";
import RowActions from "./RowActions";
import { useQuerySuccessHandler } from "@/lib/useQuerySuccessHandler";

const Batch: React.FC<{
  batchData: ReadCommodityBatchDBType | ReadProductBatchDBType;
  deleteBatchMutation: () => void;
}> = ({ batchData, deleteBatchMutation }) => {
  const successHandler = useQuerySuccessHandler({
    successToastMessage: "Lote actualizado con éxito",
    queryKeys: [["commodyBatch", batchData.id], ["commodities"]],
  });

  return (
    <div className="text-sm grid grid-cols-[auto_20px] max-w-full items-center pr-2">
      <div className="overflow-hidden pr-1 truncate">{batchData.external_id}</div>
      <RowActions deleteItemMutation={deleteBatchMutation} itemData={batchData} />
    </div>
  );
};

export default Batch;
