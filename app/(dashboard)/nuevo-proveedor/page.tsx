import NewSupplierForm from "@/components/NewSupplierForm";
import React from "react";

import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

const NewSupplierPage: React.FC = () => {
  const queryClient = new QueryClient();

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NewSupplierForm />
    </HydrationBoundary>
  );
};

export default NewSupplierPage;
