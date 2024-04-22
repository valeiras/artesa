import UpdateSupplierForm from "@/components/suppliers/UpdateSupplierForm";
import React from "react";

import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { getSingleSupplier } from "@/lib/actions/supplierActions";

type Props = { params: { id: string } };

const UpdateSupplierPage: React.FC<Props> = async ({ params }) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["supplier", params.id],
    queryFn: () => getSingleSupplier(params.id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <UpdateSupplierForm supplierId={params.id} />
    </HydrationBoundary>
  );
};

export default UpdateSupplierPage;
