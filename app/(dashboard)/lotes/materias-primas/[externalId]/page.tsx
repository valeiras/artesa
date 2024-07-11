"use client";

import React from "react";
import { useDatabase } from "@/lib/hooks";
import { getSingleCommodityBatch } from "@/lib/actions/commodityBatchActions";
import Spinner from "@/components/Spinner";
import PageWrapper from "@/components/PageWrapper";
import { getAmountEvolution } from "@/lib/charts/getAmountEvolution";
import { getChartData } from "@/lib/charts/getChartData";

const SingleCommodityBatchPage: React.FC<{ params: { externalId: string } }> = ({ params: { externalId } }) => {
  const { dbData: currCommodityBatch, isPending } = useDatabase({
    queryKey: ["singleCommodityBatch", externalId],
    queryFn: () => getSingleCommodityBatch({ externalId }),
  });

  const amountEvolution = getAmountEvolution(currCommodityBatch);
  const chartData = getChartData(amountEvolution);

  if (isPending) {
    return (
      <div className="flex justify-center align-center h-[70dvh]">
        <Spinner width="50px" />
      </div>
    );
  }

  return <PageWrapper heading={currCommodityBatch?.external_id || ""}></PageWrapper>;
};

export default SingleCommodityBatchPage;
