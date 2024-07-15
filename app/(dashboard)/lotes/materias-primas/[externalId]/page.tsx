"use client";

import React from "react";
import { useDatabase } from "@/lib/hooks";
import { getSingleCommodityBatch } from "@/lib/actions/commodityBatchActions";
import Spinner from "@/components/Spinner";
import PageWrapper from "@/components/PageWrapper";
import { getAmountEvolution } from "@/lib/charts/getAmountEvolution";
import { getChartData } from "@/lib/charts/getChartData";
import { SimpleAreaChart } from "@/components/charts";
import { valueToLabel } from "@/lib/db/units";
import { CommodityBatchInfoCard } from "@/components/commodityBatches";

const SingleCommodityBatchPage: React.FC<{ params: { externalId: string } }> = ({ params: { externalId } }) => {
  const { dbData: currCommodityBatch, isPending } = useDatabase({
    queryKey: ["singleCommodityBatch", externalId],
    queryFn: () => getSingleCommodityBatch({ externalId }),
  });

  if (isPending) {
    return (
      <div className="flex justify-center align-center h-[70dvh]">
        <Spinner width="50px" />
      </div>
    );
  }

  if (!currCommodityBatch) {
    return <p>No se encontró el lote de materia prima.</p>;
  }

  const amountEvolution = getAmountEvolution(currCommodityBatch);
  const chartData = getChartData(amountEvolution);

  return (
    <PageWrapper heading={`${currCommodityBatch.external_id}`}>
      <div className="grid grid-cols-1 md:grid-cols-[minmax(400px,1fr)_auto] md:max-w-[1100px] items-stretch justify-start gap-4">
        <CommodityBatchInfoCard
          currBatch={currCommodityBatch}
          availableAmount={amountEvolution?.at(-1)?.amount || 0}
          className="md:col-start-2 md:row-start-1"
        />
        <SimpleAreaChart
          chartData={chartData!}
          title={`Cantidad disponible del lote (${valueToLabel[currCommodityBatch.commodity.unit || "unit"]}):`}
          className="md:col-start-1 md:row-start-1"
        />
      </div>
    </PageWrapper>
  );
};

export default SingleCommodityBatchPage;
