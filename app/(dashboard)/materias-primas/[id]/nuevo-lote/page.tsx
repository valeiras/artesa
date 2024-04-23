import React from "react";

type Props = { params: { id: string } };
import { getAllSuppliers } from "@/lib/actions/supplierActions";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import NewCommodityBatchForm from "@/components/commodityBatches/NewCommodityBatchForm";
import { getSingleCommodity } from "@/lib/actions/commodityActions";

const page: React.FC<Props> = async ({ params }) => {
  const queryClient = new QueryClient();
  const commodityId = parseInt(params.id);

  await queryClient.prefetchQuery({
    queryKey: ["commodity", commodityId],
    queryFn: () => getSingleCommodity(commodityId),
  });

  await queryClient.prefetchQuery({
    queryKey: ["suppliers"],
    queryFn: () => getAllSuppliers(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NewCommodityBatchForm commodityId={commodityId} />
    </HydrationBoundary>
  );
};

export default page;
