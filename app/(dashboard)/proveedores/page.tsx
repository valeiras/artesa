import React from "react";

import { getAllSuppliers } from "@/lib/actions/supplierActions";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import SuppliersDataTable from "@/components/suppliers/SuppliersDataTable";

const SuppliersPage: React.FC = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["suppliers"],
    queryFn: () => getAllSuppliers(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="flex flex-row justify-between items-center mb-8">
        <h2 className="item-list-header">Proveedores:</h2>
      </div>
      <SuppliersDataTable />
    </HydrationBoundary>
  );
};

export default SuppliersPage;
