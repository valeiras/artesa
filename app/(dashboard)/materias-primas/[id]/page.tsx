import UpdateCommodityForm from "@/components/commodities/UpdateCommodityForm";
import React from "react";

import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { getSingleCommodity } from "@/lib/actions/commodityActions";

type Props = { params: { id: string } };

const UpdateCommodityPage: React.FC<Props> = async ({ params }) => {
  const queryClient = new QueryClient();
  const commodityId = parseInt(params.id);

  await queryClient.prefetchQuery({
    queryKey: ["commodity", commodityId],
    queryFn: () => getSingleCommodity(commodityId),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <UpdateCommodityForm commodityId={commodityId} />
    </HydrationBoundary>
  );
};

export default UpdateCommodityPage;
