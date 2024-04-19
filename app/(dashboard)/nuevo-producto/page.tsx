import NewProductForm from "@/components/NewProductForm";
import React from "react";

import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

const NewProductPage: React.FC = () => {
  const queryClient = new QueryClient();
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NewProductForm />
    </HydrationBoundary>
  );
};

export default NewProductPage;
