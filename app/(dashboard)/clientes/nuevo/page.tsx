import NewClientForm from "@/components/clients/NewClientForm";
import React from "react";

import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

const NewClientPage: React.FC = () => {
  const queryClient = new QueryClient();

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NewClientForm />
    </HydrationBoundary>
  );
};

export default NewClientPage;
