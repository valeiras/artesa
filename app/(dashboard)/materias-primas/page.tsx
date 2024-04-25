import React from "react";

import { getAllCommoditiesWithBatches } from "@/lib/actions/commodityActions";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import CommoditiesDataTable from "@/components/commodities/CommoditiesDataTable";

const CommoditiesPage: React.FC = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["commodities"],
    queryFn: () => getAllCommoditiesWithBatches(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="flex flex-row justify-between items-center mb-8">
        <h2 className="item-list-header">Materias primas:</h2>
      </div>
      <CommoditiesDataTable />
    </HydrationBoundary>
  );
};

export default CommoditiesPage;
