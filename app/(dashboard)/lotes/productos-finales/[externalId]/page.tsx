"use client";

import React from "react";
import { useDatabase } from "@/lib/hooks";
import { getSingleProductBatch } from "@/lib/actions/productBatchActions";
import Spinner from "@/components/Spinner";
import PageWrapper from "@/components/PageWrapper";
import { getAmountEvolution } from "@/lib/charts/getAmountEvolution";
import { getChartData } from "@/lib/charts/getChartData";
import { SimpleAreaChart } from "@/components/charts";
import { valueToLabel } from "@/lib/db/units";
import { CommodityBatchInfoCard } from "@/components/commodityBatches";
import { ProductBatchInfoCard } from "@/components/productBatches";

const SingleProductBatchPage: React.FC<{ params: { externalId: string } }> = ({ params: { externalId } }) => {
  const { dbData: currProductBatch, isPending } = useDatabase({
    queryKey: ["singleProductBatch", externalId],
    queryFn: () => getSingleProductBatch({ externalId }),
  });

  if (isPending) {
    return (
      <div className="flex justify-center align-center h-[70dvh]">
        <Spinner width="50px" />
      </div>
    );
  }

  if (!currProductBatch) {
    return <p>No se encontró el lote de materia prima.</p>;
  }

  const amountEvolution = getAmountEvolution(currProductBatch);
  const chartData = getChartData(amountEvolution);

  return (
    <PageWrapper heading={`${currProductBatch.external_id}`}>
      <div className="flex flex-col gap-4">
        <ProductBatchInfoCard currBatch={currProductBatch} availableAmount={amountEvolution?.at(-1)?.amount || 0} />
        <SimpleAreaChart
          chartData={chartData!}
          title={`Cantidad disponible del lote (${valueToLabel[currProductBatch.product.unit || "unit"]}):`}
        />
      </div>
    </PageWrapper>
  );
};

export default SingleProductBatchPage;
