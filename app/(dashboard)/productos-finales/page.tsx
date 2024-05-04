import React from "react";

import { getAllProductsWithBatches } from "@/lib/actions/productActions";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import ProductsDataTable from "@/components/products/ProductsDataTable";
import { getAllCommodities } from "@/lib/actions/commodityActions";

const ProductsPage: React.FC = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({ queryKey: ["products"], queryFn: () => getAllProductsWithBatches() });
  await queryClient.prefetchQuery({ queryKey: ["commodities"], queryFn: () => getAllCommodities() });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="flex flex-row justify-between items-center mb-8">
        <h2 className="item-list-header">Productos finales:</h2>
      </div>
      <ProductsDataTable />
    </HydrationBoundary>
  );
};

export default ProductsPage;
