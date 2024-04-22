import UpdateCustomerForm from "@/components/customers/UpdateCustomerForm";
import React from "react";

import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { getSingleCustomer } from "@/lib/actions/customerActions";

type Props = { params: { id: string } };

const UpdateCustomerPage: React.FC<Props> = async ({ params }) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["customer", params.id],
    queryFn: () => getSingleCustomer(params.id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <UpdateCustomerForm customerId={params.id} />
    </HydrationBoundary>
  );
};

export default UpdateCustomerPage;
