import React from "react";

import { getAllProducts } from "@/lib/actions/productActions";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import ProductsDataTable from "@/components/products/ProductsDataTable";

const ProductsPage: React.FC = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["products"],
    queryFn: () => getAllProducts(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="flex flex-row justify-between items-center mb-8">
        <h2 className="item-list-header">Clientes:</h2>
      </div>
      <ProductsDataTable />
    </HydrationBoundary>
  );
};

export default ProductsPage;
