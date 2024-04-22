import UpdateCustomerForm from "@/components/customers/UpdateCustomerForm";
import React from "react";

import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { getSingleCustomer } from "@/lib/actions/customerActions";

type Props = { params: { id: string } };

const UpdateCustomerPage: React.FC<Props> = async ({ params }) => {
  const queryClient = new QueryClient();
  const customerId = parseInt(params.id);

  await queryClient.prefetchQuery({
    queryKey: ["customer", customerId],
    queryFn: () => getSingleCustomer(customerId),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <UpdateCustomerForm customerId={customerId} />
    </HydrationBoundary>
  );
};

export default UpdateCustomerPage;
