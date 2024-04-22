import React from "react";

import { getAllCustomers } from "@/lib/actions/customerActions";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import CustomersDataTable from "@/components/customers/CustomersDataTable";

const CustomersPage: React.FC = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["customers"],
    queryFn: () => getAllCustomers(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="flex flex-row justify-between items-center mb-8">
        <h2 className="item-list-header">Clientes:</h2>
      </div>
      <CustomersDataTable />
    </HydrationBoundary>
  );
};

export default CustomersPage;
