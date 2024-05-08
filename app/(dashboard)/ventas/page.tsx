import React from "react";

import { getAllSales } from "@/lib/actions/saleActions";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import SalesDataTable from "@/components/sales/SalesDataTable";

const SalesPage: React.FC = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({ queryKey: ["sales"], queryFn: () => getAllSales() });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="flex flex-row justify-between items-center mb-8">
        <h2 className="item-list-header">Proveedores:</h2>
      </div>
      <SalesDataTable />
    </HydrationBoundary>
  );
};

export default SalesPage;
