import React from "react";

import { getAllClients } from "@/lib/actions/clientActions";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import ClientsDataTable from "@/components/clients/ClientsDataTable";

const ClientsPage: React.FC = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({ queryKey: ["clients"], queryFn: () => getAllClients() });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="flex flex-row justify-between items-center mb-8">
        <h2 className="item-list-header">Clientes:</h2>
      </div>
      <ClientsDataTable />
    </HydrationBoundary>
  );
};

export default ClientsPage;
