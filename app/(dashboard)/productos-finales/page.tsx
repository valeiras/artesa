import React from "react";

import ProductsDataTable from "@/components/products/ProductsDataTable";
import PageWrapper from "@/components/PageWrapper";

const ProductsPage: React.FC = async () => {
  return (
    <PageWrapper heading="Productos finales">
      <ProductsDataTable />
    </PageWrapper>
  );
};

export default ProductsPage;
