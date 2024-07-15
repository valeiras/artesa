"use client";

import React from "react";
import { useDatabase } from "@/lib/hooks";
import Spinner from "@/components/Spinner";
import PageWrapper from "@/components/PageWrapper";
import BatchList from "@/components/batches/BatchList";
import { getSingleProductWithBatches } from "@/lib/actions/productActions";
import { ComplexAreaChart } from "@/components/charts";
import { valueToLabel } from "@/lib/db/units";
import { getAmountEvolution } from "@/lib/charts/getAmountEvolution";
import { getComplexChartData } from "@/lib/charts/getComplexChartData";

const SingleCommodityPage: React.FC<{ params: { id: string } }> = ({ params }) => {
  const { dbData: currProduct, isPending } = useDatabase({
    queryKey: ["productWithBatches", params.id],
    queryFn: () => getSingleProductWithBatches({ recordId: parseInt(params.id) }),
  });

  if (isPending) {
    return (
      <div className="flex justify-center align-center h-[70dvh]">
        <Spinner width="50px" />
      </div>
    );
  }

  if (!currProduct) {
    return <p>No se encontró el producto.</p>;
  }

  const batchesData = currProduct.batches.map((batch) => {
    return { amountEvolution: getAmountEvolution(batch), batchId: batch.external_id };
  });
  const labels = currProduct.batches.map((batch) => {
    return batch.external_id;
  });
  const chartData = getComplexChartData(batchesData);

  return (
    <PageWrapper heading={currProduct?.name || ""}>
      <div className="grid grid-cols-1 md:grid-cols-[minmax(400px,1fr)_auto] md:max-w-[1000px] items-stretch justify-start gap-4 pt-4">
        <BatchList
          batches={currProduct?.batches}
          linkBase="productos-finales"
          className="md:col-start-2 md:row-start-1"
        />
        <ComplexAreaChart
          chartData={chartData}
          title={`Cantidad disponible (${valueToLabel[currProduct.unit]}):`}
          labels={labels}
          className="md:col-start-1 md:row-start-1"
        />
      </div>
    </PageWrapper>
  );
};

export default SingleCommodityPage;
