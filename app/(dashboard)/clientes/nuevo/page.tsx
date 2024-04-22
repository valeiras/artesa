import NewCustomerForm from "@/components/customers/NewCustomerForm";
import React from "react";

import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

const NewCustomerPage: React.FC = () => {
  const queryClient = new QueryClient();

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NewCustomerForm />
    </HydrationBoundary>
  );
};

export default NewCustomerPage;
