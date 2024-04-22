import UpdateSupplierForm from "@/components/suppliers/UpdateSupplierForm";
import React from "react";

import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { getSingleSupplier } from "@/lib/actions/supplierActions";

type Props = { params: { id: string } };

const UpdateSupplierPage: React.FC<Props> = async ({ params }) => {
  const queryClient = new QueryClient();
  const supplierId = parseInt(params.id);

  await queryClient.prefetchQuery({
    queryKey: ["supplier", supplierId],
    queryFn: () => getSingleSupplier(supplierId),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <UpdateSupplierForm supplierId={supplierId} />
    </HydrationBoundary>
  );
};

export default UpdateSupplierPage;
