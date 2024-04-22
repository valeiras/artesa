import NewCommodityForm from "@/components/commodities/NewCommodityForm";
import React from "react";

import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

const NewCommodityPage: React.FC = () => {
  const queryClient = new QueryClient();

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NewCommodityForm />
    </HydrationBoundary>
  );
};

export default NewCommodityPage;
