import React from "react";

import ProductsDataTable from "@/components/products/ProductsDataTable";

const ProductsPage: React.FC = async () => {
  return (
    <>
      <div className="flex flex-row justify-between items-center mb-8">
        <h2 className="item-list-header">Productos finales:</h2>
      </div>
      <ProductsDataTable />
    </>
  );
};

export default ProductsPage;
